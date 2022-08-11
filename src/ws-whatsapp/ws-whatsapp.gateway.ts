import { WebSocketGateway } from '@nestjs/websockets';
import { WsWhatsappService } from './ws-whatsapp.service';

@WebSocketGateway()
export class WsWhatsappGateway {
  constructor(private readonly wsWhatsappService: WsWhatsappService) {}
}
