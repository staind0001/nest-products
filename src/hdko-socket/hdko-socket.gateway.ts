import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { HdkoSocketService } from './hdko-socket.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors:{origin:'*'},methods: ['GET','POST']})
export class HdkoSocketGateway {
  constructor(
    private readonly hdkoSocketService: HdkoSocketService,
    private readonly JwtService: JwtService
    ) {}

  @WebSocketServer() wss:Server

  private tokenUser: string;
  private UserAddress: string;

  //ADD Async to the function if uncomment the code 
  handleConnection(client: Socket) {

    if(client.handshake.headers.uetoken === undefined || null || '') return
    const token  = client.handshake.headers.uetoken as string;
    console.log(token)

    client.join(token);
    this.tokenUser = token;

    this.wss.to(token).emit('CheckRoomConnection', token);

  }

  handleDisconnect(client: Socket) {
    //console.log("client disconected", client.id);
    this.hdkoSocketService.removeCLient(client.id);
  }

  @SubscribeMessage('HelloUE5')
  onHelloUE5(client: Socket, payload: any) {
    
    console.log("HelloUE5", payload);
    //this.wss.emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });
    this.wss.to(client.id).emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });
    console.log('HelloUE5Emmited');
  }

  @SubscribeMessage('Server_UE_AskConnectMetaMask')
  onServer_UE_AskConnectMetaMask(client: Socket, payload: any) {
    const room = this.tokenUser;
    console.log("Server_UE_AskConnectMetaMask", payload);
    //this.wss.to(room).emit('UE_WantConnectMetaMask', { room });
    this.wss.emit('UE_WantConnectMetaMask', room);
    console.log('UE_WantConnectMetaMaskEmmited');
  }

  @SubscribeMessage('ServerConnectUE')
  onConnectUE(client: Socket, payload: any) {
    const room = this.tokenUser;
    this.UserAddress = payload.account;
    client.join(room)
    this.wss.to(room).emit('CheckRoomConnection', room);
    //HERE ON PAYLOAD WE CAN SEND ALL INFO ON PAYLOAD
    //console.log("ServerReceiveConectUE", payload);
    //console.log({fromServerConnectUE:payload});
    this.wss.to(room).emit('UE_ConnectFromMetaMask', room);
    //this.wss.emit('UE_ConnectFromMetaMask', { room });
    console.log('UE_ConnectFromMetaMaskEmmited');
  }

  @SubscribeMessage('Server_ConfirmUEConnection')
  onServer_ConfirmUEConnection(client: Socket, payload: any) {
    const room = this.tokenUser;
    console.log("Server_ConfirmUEConnection", payload);
    console.log(payload);
    if(payload === this.tokenUser)
    {
      //this.wss.emit('UE_ConfirmConected', this.UserAddress );
      //console.log('UE_ConfirmConected');
      this.wss.to(room).emit('ServerSendUserData', this.UserAddress );
      console.log('ServerSendUserData');
    }
    //this.wss.to(client.id).emit('UE_ConfirmConected', { message: 'true' });

  }

  
  @SubscribeMessage('MetaMaskallreadyConnected')
  onMetaMaskallreadyConnected(client: Socket, payload: any) {

    console.log("MetaMaskallreadyConnected", payload);
    console.log(payload);
    //this.wss.to(client.id).emit('UserConnected', { message: payload });
    this.wss.emit('UserConnected', {  payload });
    console.log('UserConnected');
  }


  @SubscribeMessage('ServerDisconnectUE')
  onServerDisconnectUE(client: Socket, payload: any) {
    console.log("ServerReceiveDisconectUE", payload);
    console.log(payload);
    //this.wss.to(client.id).emit('UE_DisonnectFromMetaMask', { message: 'true' });
    this.wss.emit('UE_DisonnectFromMetaMask', { message: 'true' });
    console.log('UE_DisonnectFromMetaMask');
  }


  @SubscribeMessage('ServerUpdateTokensData')
  onServerUpdateTokensData(client: Socket, payload: any) {
    const room = this.tokenUser;
    console.log("ServerUpdateTokensData", payload);
    this.wss.to(room).emit('UE_UpdateTokensData', { message: payload });
    console.log('UE_UpdateTokensData');
  }


  
  @SubscribeMessage('Server_UEWantBuyTokens')
  onServer_UEWantBuyTokens(client: Socket, payload: any) {
    const room = this.tokenUser;
    console.log('numOfTokens', payload);
    //const numOfTokens : string = payload.numOfTokens as string;
    //console.log(payload.numberTokens);
    //console.log("Server_UEWantBuyTokens", payload);
    //this.wss.to(room).emit('UE_WantConnectMetaMask', { room });
    this.wss.to(room).emit('UE_WantBuyTokens', payload );
    console.log('UE_WantBuyTokensEmmited');
  }



  @SubscribeMessage('Server_UEWantBuyTicket')
  onServer_UEWantBuyTicket(client: Socket, payload: any) {
    const room = this.tokenUser;
    console.log(payload);
    this.wss.to(room).emit('UE_UEWantBuyTicket', payload );
    console.log('UEWantBuyTicketEmmited');
  }


  @SubscribeMessage('ServerUserHasTicket')
  onServerUserHasTicket(client: Socket, payload: any) {
    const room = this.tokenUser;
    console.log(payload);
    //TODO SEND TO DB THE TICKET INFO
    this.wss.to(room).emit('SuccessBuyTicket', payload );
    console.log('SuccessBuyTicketEmited');
  }





}






//! Con Client.join podemos agregar a el cliente a una sala, y luego con el metodo to podemos enviar un mensaje a todos los clientes de esa sala.
// client.join('room1');
// this.wss.to('room1').emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });

// Si queremos enviar un mensaje a todos los clientes conectados, usamos el metodo emit
// this.wss.emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });

// Si queremos enviar un mensaje a un cliente en especifico, usamos el metodo to
// this.wss.to(client.id).emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });

// Si queremos enviar un mensaje a todos los clientes conectados, menos a uno en especifico, usamos el metodo except
// this.wss.except(client.id).emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });

// Si queremos enviar un mensaje a todos los clientes conectados, menos a el cliente emisor 
//client.brodcast.emit('ServerEmitHelloUE5', { message: 'HelloUE5-fromUE5' });
