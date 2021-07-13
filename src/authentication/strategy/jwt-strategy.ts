import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload, done: any) {
    try {
      if (payload.exp >= Date.now() / 1000) {
        done(null, payload);
      } else {
        throw new UnauthorizedException('Expired Token');
      }
    } catch (err) {
      throw new UnauthorizedException('Unauthorized', err.message);
    }
  }
}
