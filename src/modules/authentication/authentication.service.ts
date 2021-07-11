import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  public async register(createUser: CreateUserDto): Promise<User | UserDto> {
    try {
      const hashedPassword = await bcrypt.hash(createUser.password, 10);
      const createdUser = await this.prismaService.user.create({
        data: {
          email: createUser.email,
          name: createUser.name,
          password: hashedPassword,
          points: 0,
        },
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (exception) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public async login(loginUser: LoginUserDto): Promise<{ accessToken: string }> {
    const currentUser = await this.prismaService.user.findUnique({ where: { email: loginUser.email } });
    if (!currentUser) {
      throw new BadRequestException('Invalid Credentials');
    }
    const isValidPassword = await bcrypt.compare(loginUser.password, currentUser.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    try {
      const JwtPayload = { username: currentUser.name, sub: currentUser.id };
      return { accessToken: await this.jwtService.signAsync(JwtPayload) };
    } catch (exception) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
