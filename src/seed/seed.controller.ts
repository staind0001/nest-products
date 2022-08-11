import { Controller, Get,} from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { validRoles } from '../auth/interfaces';
import { SeedService } from './seed.service';
import {ApiTags} from '@nestjs/swagger'

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
 // @Auth(validRoles.admin)
  executeSeed() {
   return this.seedService.RunSeed();
  }

}
