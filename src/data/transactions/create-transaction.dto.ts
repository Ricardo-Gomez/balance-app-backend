import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsOptional,
  IsString,
} from 'class-validator';
import { Source } from '../sources/source.schema';

export class CreateTransaction {
  readonly type: string;

  @Type(() => Source)
  readonly source: Source;
  @IsDateString()
  readonly date: Date;

  @IsString()
  readonly userId: string;

  @IsDecimal({ decimal_digits: '2' })
  readonly amount: string;

  @IsBoolean()
  readonly isRecurrent: boolean;

  @IsOptional()
  @IsString()
  readonly frequencyId: string;

  @IsOptional()
  @IsString()
  readonly details: string;
}
