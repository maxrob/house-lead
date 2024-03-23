import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { House } from '@prisma/client';

type CreateHouseInput = Pick<House, 'address' | 'postalCode' | 'city'>;

type JoinHouseInput = Pick<
  House,
  'houseId' | 'address' | 'postalCode' | 'city'
>;

@Controller('houses')
export class HouseController {
  constructor(private houseService: HouseService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  signUp(@Request() req, @Body() input: CreateHouseInput) {
    return this.houseService.createHouse({ ...input, userId: req.user.userId });
  }

  @HttpCode(HttpStatus.OK)
  @Post('join')
  signIn(@Request() req, @Body() input: JoinHouseInput) {
    return this.houseService.joinHouse({ ...input, userId: req.user.userId });
  }
}
