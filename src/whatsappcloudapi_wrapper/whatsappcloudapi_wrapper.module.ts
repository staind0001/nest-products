import { Module } from '@nestjs/common';
import { WhatsappcloudapiWrapperService } from './whatsappcloudapi_wrapper.service';
import { WhatsappcloudapiWrapperController } from './whatsappcloudapi_wrapper.controller';

@Module({
  controllers: [WhatsappcloudapiWrapperController],
  providers: [WhatsappcloudapiWrapperService]
})
export class WhatsappcloudapiWrapperModule {}
