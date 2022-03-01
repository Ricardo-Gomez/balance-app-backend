import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFrequencyDto } from './create-frequency.dto';
import { Frequency, FrequencyDocument } from './frequency.schema';

@Injectable()
export class FrequencyService {
  constructor(
    @InjectModel(Frequency.name)
    private frequyencyModel: Model<FrequencyDocument>,
  ) {}
  async findAll(): Promise<FrequencyDocument[]> {
    return this.frequyencyModel.find();
  }

  async upsert(
    createFrequencyDto: CreateFrequencyDto,
  ): Promise<FrequencyDocument> {
    const { name, ...rest } = createFrequencyDto;

    return this.frequyencyModel.findOneAndUpdate({ name }, rest, {
      upsert: true,
      new: true,
      runValidators: true,
    });
  }
}
