import { Socket } from "socket.io";
import * as WhatsappWeb from 'whatsapp-web.js'

 export interface ConnectedClientsWaWeb {
    id?:string,
    Client:WhatsappWeb.Client,
    qrCode:string,
    Session?:WhatsappWeb.ClientSession
}

