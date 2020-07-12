import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PartyService } from './party/party.service';
import { PartyController } from './party/party.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, PartyController, AuthController],
  providers: [AppService, UserService, PartyService, AuthService],
})
export class AppModule {}
