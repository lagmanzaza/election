import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PartyService } from '../party/party.service';
import db from '../knex';

import * as crypto from 'crypto';

@Injectable()
export class VoteService {
  constructor(
    private readonly userService: UserService,
    private readonly partyService: PartyService,
  ) {}

  async vote(userId: number, partyId: number) {
    const userInfo = await this.userService.findById(userId);

    if (userInfo.isVoted) {
      throw new HttpException(
        {
          message: 'user voted',
        },
        409,
      );
    }

    await this.userService.update(userId, { isVoted: true });

    const hashVote = crypto
      .createHash('sha256')
      .update(`${userId}:${partyId}`)
      .digest('hex');

    await db
      .insert({
        partyId,
        hash: hashVote,
      })
      .into('votes');

    await this.partyService.increseScore(partyId, 1);
    return {
      message: 'voted',
      hash: hashVote,
    };
  }
}
