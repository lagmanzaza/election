import { Injectable, HttpException } from '@nestjs/common';
import { IUser, CreateUser, Query } from './user.interface';
import * as argon from 'argon2';
import db from '../knex';

@Injectable()
export class UserService {
  private readonly tableName = 'users';

  async update(id: number, data: any): Promise<IUser> {
    const result = await db('users')
      .where('userId', '=', id)
      .update({ ...data, updateAt: new Date() })
      .returning('*');
    return result[0];
  }
  async create({ username, password }: CreateUser): Promise<IUser> {
    const userInfo = await db
      .select('userId')
      .from(this.tableName)
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
      .into(this.tableName)
      .returning('*');
    return {
      ...newUser[0],
      password: null,
    };
  }

  async findById(id: number): Promise<IUser> {
    const result = await db
      .select(
        'userId',
        'username',
        'password',
        'role',
        'isVoted',
        'createAt',
        'updateAt',
      )
      .from(this.tableName)
      .where('userId', '=', id);

    const isNotExist = result.length === 0;
    if (isNotExist) {
      throw new HttpException(
        {
          message: 'user not found',
        },
        404,
      );
    }

    return result[0];
  }

  async findByQuery(query: Query[]): Promise<IUser[]> {
    let baseQuery = db
      .select(
        'userId',
        'username',
        'password',
        'role',
        'isVoted',
        'createAt',
        'updateAt',
      )
      .from(this.tableName);

    query.forEach(({ field, operator, value }) => {
      baseQuery.where(field, operator, value);
    });

    const result = await baseQuery;
    return result;
  }
}
