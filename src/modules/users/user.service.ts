import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getUserInfo(userId: number): Promise<UserDto | User> {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: userId },
        include: { transactions: true },
      });
    } catch (exception) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
