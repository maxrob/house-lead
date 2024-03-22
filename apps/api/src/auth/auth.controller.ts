import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { SignUpInput } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  signUp(@Body() input: SignUpInput) {
    return this.authService.signUp(input);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() input: { email: string; password: string }) {
    return this.authService.signIn(input.email, input.password);
  }
}
