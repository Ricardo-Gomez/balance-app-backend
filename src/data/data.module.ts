import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExpenseTransaction,
  ExpenseTransactionSchema,
} from './transactions/expense-transaction.schema';
import {
  IncomeTransaction,
  IncomeTransactionSchema,
} from './transactions/income-transaction.schema';
import {
  Transaction,
  TransactionSchema,
} from './transactions/transaction.schema';
import { TransactionService } from './transactions/transaction.service';
import { User, UserSchema } from './users/user.schema';
import { UserService } from './users/user.service';
import { CategoryService } from './categories/category.service';
import { Category, CategorySchema } from './categories/category.schema';
import { SourceService } from './sources/source.service';
import { Source, SourceSchema } from './sources/source.schema';
import { FrequencyService } from './frequencies/frequency.service';
import { Frequency, FrequencySchema } from './frequencies/frequency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
        discriminators: [
          { name: IncomeTransaction.name, schema: IncomeTransactionSchema },
          { name: ExpenseTransaction.name, schema: ExpenseTransactionSchema },
        ],
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Source.name,
        schema: SourceSchema,
      },
      {
        name: Frequency.name,
        schema: FrequencySchema,
      },
    ]),
  ],
  providers: [
    TransactionService,
    UserService,
    CategoryService,
    SourceService,
    FrequencyService,
  ],
  exports: [
    TransactionService,
    UserService,
    CategoryService,
    SourceService,
    FrequencyService,
  ],
})
export class DataModule {}
