import { Module } from '@nestjs/common';
import { HdkoSocketService } from './hdko-socket.service';
import { HdkoSocketGateway } from './hdko-socket.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [HdkoSocketGateway, HdkoSocketService],
  imports:[AuthModule]
})
export class HdkoSocketModule {}
