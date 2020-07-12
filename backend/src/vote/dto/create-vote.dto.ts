import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsNumber()
  partyId: number;
}
