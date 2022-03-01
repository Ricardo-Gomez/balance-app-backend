import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../data/users/user.schema';
import { UserService } from '../data/users/user.service';
import { JwtOptions } from './jwt-options.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateGoogle(token: string): Promise<any> {
    const clientId = this.configService.get('googleAuth.clientId');
    const clientSecret = this.configService.get('googleAuth.clientSecret');

    const client = new OAuth2Client(clientId, clientSecret);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name, locale } = payload;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      return this.registerUser(email, given_name, family_name, locale);
    }
    return this.handleRegisteredUser(user);
  }
  async registerUser(
    email: string,
    name: string,
    lastName: string,
    locale = 'es',
  ) {
    const user = await this.userService.createWithGoogle({
      email,
      name,
      lastName,
      locale,
    });
    return this.handleRegisteredUser(user);
  }

  async handleRegisteredUser(user: User) {
    const { email, lastName, locale, name } = user;
    const accessToken = await this.getJwtAccessTokenForUser(user);
    const refreshToken = await this.getJwtRefreshTokenForUser(user);

    return {
      accessToken,
      refreshToken,
      user: { email, lastName, name, locale },
    };
  }

  async getJwtAccessTokenForUser(user: User): Promise<string> {
    const payload = {
      username: user.name,
      lastName: user.lastName,
      sub: user.id,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
  async getJwtRefreshTokenForUser(user: User): Promise<string> {
    const payload = {
      username: user.name,
      lastName: user.lastName,
      sub: user.id,
    };
    const { refreshTokenSecret, refreshTokenExpiration } =
      this.configService.get<JwtOptions>('jwt');
    const token = await this.jwtService.signAsync(payload, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiration,
    });

    await this.userService.setCurrentRefreshToken(token, user.id);
    return token;
  }
}
