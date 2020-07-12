import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ILogin } from './auth.interface';
import * as argon from 'argon2';
import jwt from '../jwt';

@Injectable()
export class AuthService {
  private readonly ONE_DAY = '1d';
  constructor(private readonly userService: UserService) {}

  async login({ username, password }: ILogin) {
    const listUsers = await this.userService.findByQuery([
      { field: 'username', operator: '=', value: username },
    ]);

    const isNotExist = listUsers.length !== 1;
    if (isNotExist) {
      throw new HttpException(
        {
          message: 'username not found',
        },
        404,
      );
    }
    const userInfo = listUsers[0];

    const isPasswordIncorrect = !(await argon.verify(
      userInfo.password,
      password,
    ));
    if (isPasswordIncorrect) {
      throw new HttpException(
        {
          message: 'password mismatch',
        },
        403,
      );
    }

    const token = jwt.sign(
      {
        userId: userInfo.userId,
        role: userInfo.role,
      },
      this.ONE_DAY,
    );

    return {
      token,
    };
  }
}
