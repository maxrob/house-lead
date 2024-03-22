import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    input: Prisma.UserWhereUniqueInput
  ): Promise<Omit<User, 'password'> | null> {
    const { password, ...user } = await this.prisma.user.findUnique({
      where: input,
    });
    return user;
  }
}
