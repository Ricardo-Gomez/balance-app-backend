import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [DataModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
