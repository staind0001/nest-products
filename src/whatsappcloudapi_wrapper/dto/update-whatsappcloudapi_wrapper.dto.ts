import { PartialType } from '@nestjs/swagger';
import { CreateWhatsappcloudapiWrapperDto } from './create-whatsappcloudapi_wrapper.dto';

export class UpdateWhatsappcloudapiWrapperDto extends PartialType(CreateWhatsappcloudapiWrapperDto) {}
