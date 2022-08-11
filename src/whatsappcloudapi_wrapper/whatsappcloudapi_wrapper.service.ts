import { Injectable } from '@nestjs/common';
import { CreateWhatsappcloudapiWrapperDto } from './dto/create-whatsappcloudapi_wrapper.dto';
import { UpdateWhatsappcloudapiWrapperDto } from './dto/update-whatsappcloudapi_wrapper.dto';

@Injectable()
export class WhatsappcloudapiWrapperService {
  create(createWhatsappcloudapiWrapperDto: CreateWhatsappcloudapiWrapperDto) {
    return 'This action adds a new whatsappcloudapiWrapper';
  }

  findAll() {
    return `This action returns all whatsappcloudapiWrapper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatsappcloudapiWrapper`;
  }

  update(id: number, updateWhatsappcloudapiWrapperDto: UpdateWhatsappcloudapiWrapperDto) {
    return `This action updates a #${id} whatsappcloudapiWrapper`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatsappcloudapiWrapper`;
  }
}
