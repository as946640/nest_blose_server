import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntiy } from './entities/article.entity';
import { ArticleLikeEntity } from '@/article-like/entities/article-like.entity';
import { CollectEntity } from '@/collect/entities/collect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntiy, ArticleLikeEntity,CollectEntity])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
