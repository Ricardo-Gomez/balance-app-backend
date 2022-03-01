import { Type } from 'class-transformer';
import { Source } from '../sources/source.schema';
import { CreateTransaction } from './create-transaction.dto';

export class CreateIncome extends CreateTransaction {
  @Type(() => Source)
  source: Source;
}
