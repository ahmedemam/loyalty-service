import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  exports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule {}
