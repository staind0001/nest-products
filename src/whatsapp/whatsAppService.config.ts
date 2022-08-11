import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class WhatsappServiceConfig implements HttpModuleOptionsFactory{

    bearerToken: string = 'Bearer ' + process.env.WHATSAPP_TOKEN;
    
    createHttpOptions(): HttpModuleOptions {
        return {
           headers:{
                Authorization: this.bearerToken,
                'Content-Type': 'application/json',
           },
        };
    }
  
}

