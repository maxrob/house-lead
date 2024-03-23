import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { House } from '@prisma/client';
import { GenerateCodeService } from './commons/generate-code/generate-code.service';

type CreateHouseInput = Pick<House, 'address' | 'postalCode' | 'city'> & {
  userId: 'userId';
};

type JoinHouseInput = Pick<
  House,
  'houseId' | 'address' | 'postalCode' | 'city'
> & {
  userId: 'userId';
};

@Injectable()
export class HouseService {
  constructor(
    private prisma: PrismaService,
    private generateCodeService: GenerateCodeService
  ) {}

  async createHouse(input: CreateHouseInput): Promise<House> {
    const { userId, ...data } = input;

    await this.prisma.user.findUniqueOrThrow({
      where: { userId: userId },
    });

    const code = await this.generateCodeService.generateCode();

    return this.prisma.house.create({
      data: { ...data, code, users: { connect: { userId } } },
    });
  }

  async joinHouse(input: JoinHouseInput): Promise<House> {
    await this.prisma.user.findUniqueOrThrow({
      where: { userId: input.userId },
    });

    return this.prisma.house.update({
      where: { houseId: input.houseId },
      data: { users: { connect: { userId: input.userId } }, code: null },
    });
  }
}
