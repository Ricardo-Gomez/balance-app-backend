import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import config from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    DatabaseModule,
    ApiModule,
    AuthModule,
    SeederModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
