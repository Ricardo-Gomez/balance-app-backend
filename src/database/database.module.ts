import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { DataModule } from 'src/data/data.module';

type MongooseConfig = Pick<MongooseModuleOptions, 'uri' | 'user' | 'pass'>;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<MongooseConfig>('mongo'),
      }),
      inject: [ConfigService],
    }),
    DataModule,
  ],
})
export class DatabaseModule {}
