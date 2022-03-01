import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { AuthProviders } from './auth-providers';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

const scryptPromise = promisify(scrypt);

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createWithGoogle(createUserDto: CreateUserDto): Promise<User> {
    createUserDto = { ...createUserDto, provider: AuthProviders.Google };
    return this.userModel.create(createUserDto);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
  async findById(_id: string): Promise<User> {
    return this.userModel.findById(_id);
  }

  async setCurrentRefreshToken(
    token: string,
    _id: string,
  ): Promise<UserDocument> {
    const salt = randomBytes(16).toString('hex');
    const hash = await scryptPromise(token, salt, 64).then(
      (derivedKey: Buffer) => {
        return `${salt}:${derivedKey.toString('hex')}`;
      },
    );
    return this.userModel.findOneAndUpdate(
      { _id },
      {
        hashedRefreshToken: hash,
      },
    );
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    _id: string,
  ): Promise<User | null> {
    const user = await this.findById(_id);

    const [salt, key] = user.hashedRefreshToken.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = (await scryptPromise(refreshToken, salt, 64)) as Buffer;
    const isRefreshTokenMatching = timingSafeEqual(keyBuffer, derivedKey);
    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
