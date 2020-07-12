import { Controller, Post, Body } from '@nestjs/common';
import { VoteService } from './vote.service';
import UserInfo from '../decorators/token-info';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async vote(@Body('partyId') partyId: number, @UserInfo() { payload }: any) {
    const result = await this.voteService.vote(payload.userId, partyId);
    return result;
  }
}
