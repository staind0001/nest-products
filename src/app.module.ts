import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { EnvConfig } from './config/app.config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WsWhatsappModule } from './ws-whatsapp/ws-whatsapp.module';
import { WhatsappcloudapiWrapperModule } from './whatsappcloudapi_wrapper/whatsappcloudapi_wrapper.module';



@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({

      ssl:process.env.STAGE === 'production' ? true : false,
      extra:{
        ssl:process.env.STAGE === 'production' ? {rejectUnauthorized: false} : null,
      },
      type: 'postgres',
      host:process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    CloudinaryModule,

    ConfigModule.forRoot({
      envFilePath:'.env',
      load:[EnvConfig],
    }),

    AuthModule,

    MessagesWsModule,

    WhatsappModule,

    WsWhatsappModule,

    WhatsappcloudapiWrapperModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
