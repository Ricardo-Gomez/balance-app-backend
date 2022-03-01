import { IsString } from 'class-validator';

export class CreateSourceDto {
  @IsString()
  name: string;
  @IsString()
  paymentType: string;

  owner?: string;
}
