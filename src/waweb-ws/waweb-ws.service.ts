import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WhatsappWebAdapter } from 'src/wa-web/Lib/wa-web.adapter';
import { ConnectedClientsWaWeb } from './interfaces/waweb.interfaces';
import * as WhatsappWeb from 'whatsapp-web.js'



@Injectable()
export class WawebWsService {

    constructor(
    private readonly waweb : WhatsappWebAdapter
      ) {}

    private  connectedClients: ConnectedClientsWaWeb = {
        id:null,
        Client:null,
        qrCode:'',
        Session:null,
    };
    private CodeQR = null;
    private Client : WhatsappWeb.Client = null;
   
    private Contacts = null;

    registerClient(client: Socket) {

    this.connectedClients.id = client.id;
      
    }

    removeClient() {

        delete this.connectedClients.id;
        delete this.connectedClients.Client;
    }

    async initWaWeb(){

      const {Client,QR} = await this.waweb.newClient();
       this.Client = Client;
       this.CodeQR = QR;

       //console.log(this.CodeQR);
       //console.log(this.Client);

      return {Client,QR};
    }


}


