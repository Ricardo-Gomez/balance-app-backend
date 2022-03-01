import { IsString } from 'class-validator';

export class CreateFrequencyDto {
  @IsString()
  name: Record<string, any>;

  details?: Record<string, any>;
}
