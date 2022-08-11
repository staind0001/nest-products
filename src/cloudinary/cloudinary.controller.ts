import { BadRequestException, Controller, Get, Post,UploadedFile,UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFilter';
import { CloudinaryService } from './cloudinary.service';
import {ApiTags} from '@nestjs/swagger'

@ApiTags('Files Upload-Cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:fileFilter,
  }
  ))
  async uploadImage(@UploadedFile() file: Express.Multer.File){

    if(!file){
      throw new BadRequestException('Make sure you have a valid file');
    }

   
    const res = await this.cloudinaryService.uploadImage(file);

    const secureUrl = res.secure_url;
    
    console.log({
      message:'File uploaded successfully',
      data:secureUrl
    });
    
    return {
      secureUrl
    }

  }

}
