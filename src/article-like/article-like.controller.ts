import { AllCollectDto } from '@/collect/dto/create-collect.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ArticleLikeService } from './article-like.service';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';

@Controller('articleLike')
export class ArticleLikeController {
  constructor(private readonly articleLikeService: ArticleLikeService) {}

  @Post()
  create(@Body() createArticleLikeDto: CreateArticleLikeDto) {
    return this.articleLikeService.create(createArticleLikeDto);
  }

  @Get()
  findAll(@Query() allCollectDto: AllCollectDto, @Req() req) {
    return this.articleLikeService.findAll(allCollectDto, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleLikeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleLikeDto: UpdateArticleLikeDto) {
    return this.articleLikeService.update(+id, updateArticleLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleLikeService.remove(+id);
  }
}
