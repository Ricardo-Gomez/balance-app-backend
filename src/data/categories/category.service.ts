import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getUserCategories(owner: string): Promise<CategoryDocument[]> {
    return this.categoryModel.find({ owner: { $in: [owner, undefined] } });
  }

  async addUserCategory(dto: CreateCategoryDto): Promise<CategoryDocument> {
    const { owner, name } = dto;
    return this.categoryModel.findOneAndUpdate(
      { owner, name },
      { name },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
  }
}
