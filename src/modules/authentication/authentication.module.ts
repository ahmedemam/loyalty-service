import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthenticationController } from './authentiaction.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  exports: [],
  controllers: [AuthenticationController],
  providers: [PrismaService, AuthenticationService],
})
export class AuthenticationModule {}
