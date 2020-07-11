import { Injectable, HttpException } from '@nestjs/common';
import db from '../knex';

import { ICreateParty, IUpdateParty, IParty } from './party.interface';

@Injectable()
export class PartyService {
  private readonly tableName: string = 'parties';

  async create(data: ICreateParty): Promise<IParty> {
    const result = await db
      .insert(data)
      .into(this.tableName)
      .returning('*');

    return result[0];
  }

  async updateById(id: number, data: IUpdateParty): Promise<IParty> {
    const result = await db(this.tableName)
      .update({ ...data, updateAt: new Date() })
      .where('partyId', '=', id)
      .returning('*');

    const isNotUpdated = result.length === 0;
    if (isNotUpdated) {
      throw new HttpException(
        {
          message: 'party id not found',
        },
        404,
      );
    }

    return result[0];
  }

  async findById(id: number): Promise<IParty> {
    const result = await db
      .select('partyId', 'name', 'score', 'createAt', 'updateAt')
      .from(this.tableName)
      .where('partyId', '=', id);

    const isNotExist = result.length === 0;
    if (isNotExist) {
      throw new HttpException(
        {
          message: 'party id not found',
        },
        404,
      );
    }

    return result[0];
  }

  async deleteById(id: number) {
    const result = await db(this.tableName)
      .where('partyId', '=', id)
      .del();

    const isNotDeleted = result === 0;
    if (isNotDeleted) {
      throw new HttpException(
        {
          message: 'party id not found',
        },
        404,
      );
    }

    return {
      message: 'deleted',
    };
  }
  async findAll(): Promise<IParty[]> {
    const result = await db
      .select('partyId', 'name', 'score', 'createAt', 'updateAt')
      .from(this.tableName);

    const isNotExist = result.length === 0;
    if (isNotExist) {
      throw new HttpException(
        {
          message: 'no content',
        },
        204,
      );
    }

    return result;
  }
}
