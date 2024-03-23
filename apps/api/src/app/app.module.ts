import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { HouseModule } from '../house/house.module';

@Module({
  imports: [UsersModule, AuthModule, HouseModule, PrismaModule],
})
export class AppModule {}
