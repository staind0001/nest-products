import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaWebService } from './wa-web.service';
import { CreateWaWebDto } from './dto/create-wa-web.dto';
import { UpdateWaWebDto } from './dto/update-wa-web.dto';

@Controller('wa-web')
export class WaWebController {
  constructor(private readonly waWebService: WaWebService) {}


  @Get()
  executeWaWebService() {
    return this.waWebService.executeWaWebService();
  }
  
}
