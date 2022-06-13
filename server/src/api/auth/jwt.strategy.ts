import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * validate
   */
  public async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
