import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSourceDto } from './create-source.dto';
import { Source, SourceDocument } from './source.schema';

@Injectable()
export class SourceService {
  constructor(
    @InjectModel(Source.name) private sourceModel: Model<SourceDocument>,
  ) {}
  async upsert(dto: CreateSourceDto): Promise<SourceDocument> {
    return this.sourceModel.findOneAndUpdate({ name: dto.name }, dto, {
      upsert: true,
      new: true,
      runValidators: true,
    });
  }
  async getUserSources(owner: string): Promise<SourceDocument[]> {
    return this.sourceModel.find({ owner: { $in: [owner, undefined] } });
  }

  async addUserSource(dto: CreateSourceDto): Promise<SourceDocument> {
    const { owner, name, ...rest } = dto;
    return this.sourceModel.findOneAndUpdate(
      { owner, name },
      { ...rest },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
  }
}
