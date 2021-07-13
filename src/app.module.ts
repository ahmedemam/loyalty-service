import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtStrategy } from './authentication/strategy/jwt-strategy';
import { PrismaService } from './prisma.service';
import { TransactionModule } from './transactions/transaction.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    AuthenticationModule,
    PassportModule,
    ConfigModule,
    SwaggerModule,
    EventEmitterModule.forRoot()
  ],
  exports: [PrismaService],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
