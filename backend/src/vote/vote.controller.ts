import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RoleGuard, Roles } from '../guards/roles-guard';

import { VoteService } from './vote.service';
import UserInfo from '../decorators/token-info';

@Controller('votes')
@UseGuards(RoleGuard)
@Roles(['admin', 'user'])
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async vote(@Body('partyId') partyId: number, @UserInfo() userInfo: any) {
    const result = await this.voteService.vote(userInfo.userId, partyId);
    return result;
  }
}
