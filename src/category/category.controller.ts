import { AllowAnon } from '@/common/decorators/allow-anon.decorator';
import { ResultData } from '@/common/utils/result';
import { AllLabelDto } from '@/label/dto/label.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags, ApiBasicAuth, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntiy } from './entities/category.entity';

@ApiTags('文章分类')
@Controller('category')
@ApiExtraModels(ResultData, CategoryEntiy)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post()
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, req.user);
  }

  @Get()
  @AllowAnon()
  findAll(@Query() allLabelDto: AllLabelDto) {
    return this.categoryService.findAll(allLabelDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
