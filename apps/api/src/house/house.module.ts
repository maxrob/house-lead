import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { GenerateCodeService } from './commons/generate-code/generate-code.service';

@Module({
  controllers: [HouseController],
  providers: [HouseService, GenerateCodeService],
})
export class HouseModule {}
