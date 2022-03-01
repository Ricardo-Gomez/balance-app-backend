import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { TransactionsController } from './transactions/transactions.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [DataModule],
  controllers: [TransactionsController, UsersController],
})
export class ApiModule {}
