import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { Source } from '../sources/source.schema';
import { CreateTransaction } from './create-transaction.dto';

export class CreateExpense extends CreateTransaction {
  @IsString()
  category: string;

  @Type(() => Source)
  source: Source;
}
