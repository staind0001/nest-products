import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Res, HttpStatus, Query, Req, HttpException } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsAppCloaudAPIRequest } from './interfaces/whatsapp-request.interface';
import { Response } from 'express';


@Controller('webhook')
export class WhatsappController {

  private readonly logger = new Logger('WhatsappController')

  constructor(private readonly whatsappService: WhatsappService) {}

  // @Post()
  // testMessage(
  //   @Body() request:WhatsAppCloaudAPIRequest,
  //   @Res() response
  // ){
  //   this.logger.log(`testMessage: ${JSON.stringify(request)}`);
  //   this.whatsappService.testMessage(request).then(data => {
  //     response.status(HttpStatus.CREATED).json(data);
  //   }).catch(error => {
  //     console.log(error.response.data.error);
  //     response.status(HttpStatus.BAD_REQUEST).json(error.response.data.error);
  //   })

  // }


  @Post()
  SendMessage(
    @Body() request:WhatsAppCloaudAPIRequest,
    @Res() response,
  ){
    this.logger.log(`testMessage: ${JSON.stringify(request)}`);
    this.whatsappService.sendMessage(request).then(data => {
      response.status(HttpStatus.CREATED).json(data);
    }).catch(error => {
      console.log(error.response.data.error);
      response.status(HttpStatus.BAD_REQUEST).json(error.response.data);
    })

  }

  // @Post()
  // GetMessage(
  //   @Body() request:WhatsAppCloaudAPIRequest,
  //   @Res() response,
  // ){
  //   this.logger.log(`testMessage: ${JSON.stringify(request)}`);
  //   if(response)
  //   {
  //     let body = response.body;
  //     console.log(JSON.stringify(response.body, null, 2));

  //     if (response.body.object)
  //     {
  //       if(
  //         response.body.entry &&
  //         response.body.entry[0].changes &&
  //         response.body.entry[0].changes[0] &&
  //         response.body.entry[0].changes[0].value.messages &&
  //         response.body.entry[0].changes[0].value.messages[0]
  //       ){
  //         let phone_number_id =response.body.entry[0].changes[0].value.metadata.phone_number_id;
  //         let from = response.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
  //         let msg_body = response.body.entry[0].changes[0].value.messages[0].text.body;

  //         let data = {
  //           messaging_product: 'whatsapp',
  //           to:from,
  //           text:{body: "Ack: " + msg_body },
  //           headers:{"Content-Type": "application/json"}
  //         }

  //         console.log({data});

  //       }else{
  //         console.log("No message found");
  //       }
  //     }
  //   }
      

  // }

  @Get()
 async getVerifyToken(
   @Query('hub.mode') mode,
   @Query('hub.challenge') challenge,
   @Query('hub.verify_token') verifyToken
  ){

    console.log(mode, challenge, verifyToken);

    const token = process.env.WHATSAPP_VERIFY_TOKEN;

    console.log(mode,token, verifyToken);

    if(challenge) return challenge;
    else throw new HttpException('Invalid Challenge', HttpStatus.BAD_REQUEST);

  }
}
