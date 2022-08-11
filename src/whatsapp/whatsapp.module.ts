import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import {HttpModule} from '@nestjs/axios'
import { WhatsappServiceConfig } from './whatsAppService.config';


@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService],
  imports: [HttpModule.registerAsync({
    useClass: WhatsappServiceConfig,
  }),
  WhatsappModule
  ],
})
export class WhatsappModule {}
