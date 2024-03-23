import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { SignUpInput } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(input: SignUpInput): Promise<{
    access_token: string;
  }> {
    const { password, ...data } = input;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
    });

    const payload = { userId: user.userId, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const isMatch = await bcrypt.compare(hash, user.password);

    if (isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
