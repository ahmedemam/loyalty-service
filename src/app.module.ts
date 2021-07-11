import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtStrategy } from './modules/authentication/strategy/jwt-strategy';
import { TransactionModule } from './modules/transactions/transaction.module';
import { UserModule } from './modules/users/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    AuthenticationModule,
    PassportModule,
    ConfigModule,
    SwaggerModule,
  ],
  exports: [PrismaService],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
