import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {AxiosResponse} from 'axios';
import { firstValueFrom } from 'rxjs';
import { WhatsAppCloaudAPIRequest } from './interfaces/whatsapp-request.interface';
import { WhatsAppCloaudAPIResponse } from './interfaces/whatsapp-response.interface';


@Injectable()
export class WhatsappService  {

  baseUrl = process.env.WHATSAPP_URLCLOUD_API;
  verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    constructor(private readonly httpService: HttpService) {}

    // async testMessage(request: WhatsAppCloaudAPIRequest) : Promise<AxiosResponse<WhatsAppCloaudAPIResponse>>{
    //   const {data} = await firstValueFrom(this.httpService.post(this.baseUrl, request));

    //   console.log(data);

    //   return data;
    // }



    async sendMessage(request: WhatsAppCloaudAPIRequest) : Promise<AxiosResponse<WhatsAppCloaudAPIResponse>>{
      const {data} = await firstValueFrom(this.httpService.post(this.baseUrl, request));

      console.log(data);

      return data;
    }

    async getVerifyToken() {
      return this.verifyToken;
    }


}
