import { Injectable, HttpException } from '@nestjs/common';
import { IUser, CreateUser } from './user.interface';
import * as argon from 'argon2';
import db from '../knex';

@Injectable()
export class UserService {
  async create({ username, password }: CreateUser): Promise<IUser> {
    const userInfo = await db
      .select('userId')
      .from('users')
      .where('username', '=', username);

    const isExist = userInfo.length;
    if (isExist) {
      throw new HttpException(
        {
          message: 'duplicate username',
        },
        409,
      );
    }

    const hashPassword = await argon.hash(password);

    const newUser = await db
      .insert({ username, password: hashPassword })
      .into('users')
      .returning('*');
    return {
      ...newUser[0],
      password: null,
    };
  }
}
