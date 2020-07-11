import { MinLength } from 'class-validator';

export class CreatePartyDto {
  @MinLength(8)
  name: string;
}
