import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhatsappcloudapiWrapperService } from './whatsappcloudapi_wrapper.service';
import { CreateWhatsappcloudapiWrapperDto } from './dto/create-whatsappcloudapi_wrapper.dto';
import { UpdateWhatsappcloudapiWrapperDto } from './dto/update-whatsappcloudapi_wrapper.dto';

@Controller('whatsappcloudapi-wrapper')
export class WhatsappcloudapiWrapperController {
  constructor(private readonly whatsappcloudapiWrapperService: WhatsappcloudapiWrapperService) {}

  @Post()
  create(@Body() createWhatsappcloudapiWrapperDto: CreateWhatsappcloudapiWrapperDto) {
    return this.whatsappcloudapiWrapperService.create(createWhatsappcloudapiWrapperDto);
  }

  @Get()
  findAll() {
    return this.whatsappcloudapiWrapperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappcloudapiWrapperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhatsappcloudapiWrapperDto: UpdateWhatsappcloudapiWrapperDto) {
    return this.whatsappcloudapiWrapperService.update(+id, updateWhatsappcloudapiWrapperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappcloudapiWrapperService.remove(+id);
  }
}
