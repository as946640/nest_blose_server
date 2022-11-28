import { Module } from '@nestjs/common';
import { ArticleLikeService } from './article-like.service';
import { ArticleLikeController } from './article-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLikeEntity } from './entities/article-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleLikeEntity])],
  controllers: [ArticleLikeController],
  providers: [ArticleLikeService]
})
export class ArticleLikeModule {}
