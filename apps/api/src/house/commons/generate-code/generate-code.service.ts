import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../config/prisma/prisma.service';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const length = 6;

@Injectable()
export class GenerateCodeService {
  constructor(private prisma: PrismaService) {}

  async generateCode(): Promise<string> {
    let code = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    const houses = await this.prisma.house.findMany({ where: { code } });
    if (houses.length > 0) {
      code = await this.generateCode();
    }

    return code;
  }
}
