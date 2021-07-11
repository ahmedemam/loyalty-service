import { Body, Post, Req, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { UserDto } from '../users/dto/user.dto';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Authentication APIs')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  public async login(@Req() req: Request, @Body() loginUser: LoginUserDto, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    return await this.authenticationService.login(loginUser);
  }

  @Post('register')
  @ApiCreatedResponse({ type: UserDto })
  public async register(@Req() request: Request, @Body() createUser: CreateUserDto): Promise<UserDto | User> {
    return this.authenticationService.register(createUser);
  }
}
