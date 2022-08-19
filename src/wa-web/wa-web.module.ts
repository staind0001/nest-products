import { Module } from '@nestjs/common';
import { WaWebService } from './wa-web.service';
import { WaWebController } from './wa-web.controller';
import { WhatsappWebAdapter } from './Lib/wa-web.adapter';

@Module({
  controllers: [WaWebController],
  providers: [WaWebService,WhatsappWebAdapter]
})
export class WaWebModule {}
