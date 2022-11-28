
import { AllowAnon } from '@/common/decorators/allow-anon.decorator';
import { ApiResult } from '@/common/utils/ApiResult';
import { ResultData } from '@/common/utils/result';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { AllArticleDto } from './dto/article.dto';
import { ArticleLikeDto } from './dto/articleLike.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntiy } from './entities/article.entity';



@ApiTags('文章')
@Controller('article')
@ApiExtraModels(ResultData, ArticleEntiy)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @AllowAnon()
  @ApiResult(ArticleEntiy)
  findAll(@Query() allArticleDto: AllArticleDto) {
    console.log(allArticleDto);
    
    return this.articleService.findAll(allArticleDto);
  }

  @Get(':id')
  @ApiResult(ArticleEntiy)
  @AllowAnon()
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
