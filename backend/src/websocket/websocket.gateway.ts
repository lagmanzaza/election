import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ transports: ['websocket'] })
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('votes')
  findAll(@MessageBody() data: any): Object {
    console.log(data);
    return {
      message: 'created',
    };
  }
}
