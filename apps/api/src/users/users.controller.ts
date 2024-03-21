import { Controller, HttpStatus, HttpCode, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('user')
  user(@Request() req) {
    return this.userService.user({ email: req.user.email });
  }
}
