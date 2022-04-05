import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
  async deleteUserCategory(owner: string, id: string): Promise<any> {
    return this.categoryModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      owner,
    });
  }
}
