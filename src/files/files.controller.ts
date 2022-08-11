import { UploadedFile, UseInterceptors, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { Controller,Post} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter';
import { fileNamer } from './helpers/fileNamer';
import {ApiTags} from '@nestjs/swagger'


@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,

  ){}


  @Get('file/:fileName')
  findFile(
    @Res() res: Response,
    @Param('fileName') fileName:string
  ){
    const path = this.filesService.getStaticFile(fileName)

    res.sendFile(path);
  }


  @Post('file')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:fileFilter,
    storage: diskStorage({
      destination:'./static/uploads',
      filename:fileNamer
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File){

      if(!file){
        throw new BadRequestException('Make sure you have a valid file');
      }

      const secureUrl = `${this.configService.get('HOST_API')}/files/file/${file.filename}`

    return {
      secureUrl
    };

  }
}
