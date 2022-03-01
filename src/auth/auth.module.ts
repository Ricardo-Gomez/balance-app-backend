import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DataModule } from '../data/data.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtOptions } from './jwt-options.interface';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';

@Module({
  imports: [
    DataModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { accessTokenExpiration, accessTokenSecret } =
          configService.get<JwtOptions>('jwt');
        return {
          secret: accessTokenSecret,
          signOptions: {
            expiresIn: accessTokenExpiration,
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
