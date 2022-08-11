import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

//import { fileUpload } from './helpers/fileUpload';



@Injectable()
export class FilesService {

  getStaticFile(fileName:string){

    const path = join(__dirname, '../../static/uploads', fileName);

    if(!existsSync(path)){
      throw new BadRequestException(`File not found ${fileName}`);
    }

    return path;
  }

}
