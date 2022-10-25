import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessagesWsService } from './messages-ws.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({cors: true,namespace: '/messages-ws'})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer() wss:Server

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}


 async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload

    try {

      payload = this.jwtService.verify(token);
     await this.messagesWsService.registerClient(client,payload.id);

    } catch (error) {
      client.disconnect();
      return
    }
   //console.log({payload});
   //console.log('client connected',client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients()); 
   //console.log({connectedClients: this.messagesWsService.getConnectedClients() });
  }


  handleDisconnect(client: Socket) {
    //console.log('client disconnected',client.id);
    this.messagesWsService.removeClient(client.id);
  }


  @SubscribeMessage('message-from-client')
  OnMessageFromClient(client: Socket, payload: NewMessageDto) {

    // //!EMIT Only to the client that sent the message
    // client.emit('message-from-server',{
    //   fullName: 'Server-delivery',
    //   message: payload.message || 'No message',
    // });

    // //!EMIT to all clients except the client that sent the message
    // client.broadcast.emit('message-from-server',{
    //   fullName: 'Server-delivery',
    //   message: payload.message || 'No message',
    // });

    //!EMIT to all clients
    this.wss.emit('message-from-server',{
      fullName:this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'No message',
    });

  }


}
