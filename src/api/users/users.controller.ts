import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateCategoryDto } from '../../data/categories/create-category.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RequestWithUser } from '../../auth/request-with-user.interface';
import { CategoryService } from '../../data/categories/category.service';
import { UserService } from '../../data/users/user.service';
import { Category } from '../../data/categories/category.schema';
import MongooseClassSerializerInterceptor from '../mongooseClassSerializer.interceptor';
import { SourceService } from '../../data/sources/source.service';
import { Source, SourceDocument } from '../..//data/sources/source.schema';
import { CreateSourceDto } from '../..//data/sources/create-source.dto';
import { Frequency } from '../../data/frequencies/frequency.schema';
import { FrequencyService } from '../..//data/frequencies/frequency.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private sourceService: SourceService,
    private frequencyService: FrequencyService,
  ) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(Category))
  @Get('categories')
  async getAllCategories(@Request() req: RequestWithUser): Promise<Category[]> {
    const { id } = req.user;
    return this.categoryService.getUserCategories(id);
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(Category))
  @Delete('categories/:id')
  async deleteCategory(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<Category[]> {
    const { id: owner } = req.user;
    return this.categoryService.deleteUserCategory(owner, id);
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(Category))
  @Post('category')
  async addCategory(
    @Body() createCategory: CreateCategoryDto,
    @Request() req: RequestWithUser,
  ): Promise<Category> {
    const { id } = req.user;
    createCategory.owner = id;
    return this.categoryService.addUserCategory(createCategory);
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(Source))
  @Get('sources')
  async getAllSources(
    @Request() req: RequestWithUser,
  ): Promise<SourceDocument[]> {
    const { id } = req.user;
    return this.sourceService.getUserSources(id);
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(Source))
  @Post('source')
  async addSource(
    @Body() SourceDto: CreateSourceDto,
    @Request() req: RequestWithUser,
  ): Promise<Source> {
    const { id } = req.user;
    SourceDto.owner = id;
    return this.sourceService.addUserSource(SourceDto);
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(Source))
  @Delete('sources/:id')
  async deletePaymentType(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<Category[]> {
    const { id: owner } = req.user;
    return this.sourceService.deleteUserPaymentType(owner, id);
  }
  @UseInterceptors(MongooseClassSerializerInterceptor(Frequency))
  @Get('frequencies')
  async getFrequencies(): Promise<Frequency[]> {
    return this.frequencyService.findAll();
  }
}
