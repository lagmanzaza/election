import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('connected');
  }

  @SubscribeMessage('votes')
  findAll(@MessageBody() data: any): Object {
    console.log(this.server);
    console.log(data);
    return {
      message: 'created',
    };
  }
}
