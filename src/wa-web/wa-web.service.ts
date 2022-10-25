import { Injectable } from '@nestjs/common';
import { CreateWaWebDto } from './dto/create-wa-web.dto';
import { UpdateWaWebDto } from './dto/update-wa-web.dto';
import { WhatsappWebAdapter } from './Lib/wa-web.adapter';

@Injectable()
export class WaWebService {

  constructor(
    private readonly waweb : WhatsappWebAdapter
  ) {}

  
 
  async executeWaWebService (){

    const client  = await this.waweb.newClient();

    return client;
  }
   

}
