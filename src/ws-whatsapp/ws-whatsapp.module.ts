import { Module } from '@nestjs/common';
import { WsWhatsappService } from './ws-whatsapp.service';
import { WsWhatsappGateway } from './ws-whatsapp.gateway';

@Module({
  providers: [WsWhatsappGateway, WsWhatsappService]
})
export class WsWhatsappModule {}
