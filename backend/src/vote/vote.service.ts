import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PartyService } from '../party/party.service';
import { EventsGateway } from '../websocket/websocket.gateway';

import db from '../knex';
import * as crypto from 'crypto';
@Injectable()
export class VoteService {
  constructor(
    private readonly userService: UserService,
    private readonly partyService: PartyService,
    private readonly io: EventsGateway,
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

    const partyInfo = await this.partyService.increseScore(partyId, 1);
    await this.userService.update(userId, { isVoted: true });

    this.io.server.emit('votes', partyInfo);
    return {
      message: 'voted',
      hash: hashVote,
    };
  }
}
