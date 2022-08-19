import { PartialType } from '@nestjs/swagger';
import { CreateWaWebDto } from './create-wa-web.dto';

export class UpdateWaWebDto extends PartialType(CreateWaWebDto) {}
