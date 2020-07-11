import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PartyService } from './party/party.service';
import { PartyController } from './party/party.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, PartyController],
  providers: [AppService, UserService, PartyService],
})
export class AppModule {}
