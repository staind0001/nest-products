import { Module } from '@nestjs/common';
import { WawebWsService } from './waweb-ws.service';
import { WawebWsGateway } from './waweb-ws.gateway';
import { WhatsappWebAdapter } from 'src/wa-web/Lib/wa-web.adapter';

@Module({
  providers: [WawebWsGateway, WawebWsService,WhatsappWebAdapter]
})
export class WawebWsModule {}
