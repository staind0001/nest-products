import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WawebWsService } from './waweb-ws.service';
import * as WhatsappWeb from 'whatsapp-web.js'
import { ConnectedClientsWaWeb } from './interfaces/waweb.interfaces';
import { NewMessageWaWebDto } from './dtos/new-message.dto';
import { cleanNumber, isvalidNumber } from 'src/wa-web/Lib/handle';
import { botResponse } from './dialogFlow/dialogflow';

@WebSocketGateway({ cors: true, namespace: '/waweb-ws' })
export class WawebWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly wawebWsService: WawebWsService) {}

  private Client: WhatsappWeb.Client;

  async handleConnection(client: Socket) {
    //const token = client.handshake.query.authentication as string;
    const clientwaweb = new WhatsappWeb.Client({
      authStrategy: new WhatsappWeb.LocalAuth(),
      puppeteer: { headless: true, args: ['--no-sandbox'] },
    });

    clientwaweb.on('qr', (qr) => {
      console.log(qr);
      this.wss.emit('qrcode-updated', qr);
    });

    clientwaweb.on('ready', async () => {
      console.log('READY');
      this.Client = clientwaweb;
      // const Contacts = new Promise((resolve, reject) => {
      //   resolve(clientwaweb.getContacts());
      // });
      // const ContactsResolve: WhatsappWeb.Contact[] = await Contacts.then();
      // let arrContacts = [];
      // ContactsResolve.forEach((contact) => {
      //   arrContacts.push({ name: contact.name, number: contact.number });
      // });
      // console.log(arrContacts);
      // this.wss.emit('contacts-waweb',arrContacts);
      this.wss.emit('qr-ready', 'ok');

      clientwaweb.on('message', async (msg) => {
        console.log(msg);

        const { from, body, hasMedia } = msg;

        if (!isvalidNumber(from)) {
          return;
        }
        if (from === 'status@broadcast') {
          return;
        }
        const NewMessage = body.toLowerCase();
        const phoneNumber = cleanNumber(from);

        if (hasMedia) {
          //TODO : save media
          console.log({ from: phoneNumber, body: NewMessage, Media: hasMedia });
        }

        console.log({ from: phoneNumber, body: NewMessage });

        // msg.reply('Hola! y✌️ Bienvenido a este 🤖 CHATBOT de Whatsapp')
        // msg.reply('Para comenzar, dime tu nombre')
        
        // const media= await WhatsappWeb.MessageMedia.fromUrl(`https://res.cloudinary.com/dy26mpp7o/image/upload/c_thumb,w_200,g_face/v1638609617/myo25k6yfmtqczs7ydzz.png`)

        // clientwaweb.sendMessage(phoneNumber,media)
        // if(!NewMessage.length)return;
        const botRes = await botResponse(NewMessage)
        
        console.log(botRes);


        //TODO : save message
        //this.wss.emit('message-waweb',message);
      });


    });

    //this.wss.emit('qrcode-updated',QR);
    //this.wss.emit('contacts-waweb',ContactsData);
    // this.wss.emit('message-received-waweb',listenMessageResolved);
    //this.wss.emit('message-received-waweb',MessageReceived);
    //this.wss.emit('contacts-waweb',Contacts);
    clientwaweb.initialize();
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    //this.Client.logout();
  }

  @SubscribeMessage('client-message')
  async handleClientMessage(socket: Socket, payload: NewMessageWaWebDto) {
    const { number, message, Media } = payload;

    const cleanNum = cleanNumber(number);
    //console.log(number,message);
    //console.log(this.Client);

    console.log(cleanNum, message, Media);

    // if(payload.Media !== '')
    // {
    //   const media = await WhatsappWeb.MessageMedia.fromUrl(Media);
    //   if(media === undefined || media === null)
    //   {
    //     //TODO : send error message to FrontEnd       
    //     return;
    //   }else{
    //     this.Client.sendMessage(cleanNum, message);
    //     this.Client.sendMessage(cleanNum, media,);
    //   }

    // }else{

      await this.Client.sendMessage(cleanNum, message);

      this.wss.emit('res-from-server-to message', {
        confirmation: 'Message ok',
        message: payload.message,
      });

   // }

   


    //TO Do: confirm ok reception
    //TO Do: send message to client Contact
    //TO Do: save in DB
  }
}
