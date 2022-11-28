import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { LabelModule } from './label/label.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import mysqlOption from '@/db/index';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { UploadModule } from './upload/upload.module';
import { ArticleLikeModule } from './article-like/article-like.module';
import { CollectModule } from './collect/collect.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    LoginModule,
    UserModule,
    TypeOrmModule.forRoot(mysqlOption),
    AuthModule,
    ArticleModule,
    CategoryModule,
    LabelModule,
    UploadModule,
    ArticleLikeModule,
    CollectModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {

}

