import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product,ProductImage } from 'src/products/entities';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService,CloudinaryProvider],
  imports: [
    TypeOrmModule.forFeature([Product,ProductImage])
  ],

})
export class CloudinaryModule {}
