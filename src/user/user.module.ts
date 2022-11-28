import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '@/auth/auth.module';
import { ArticleEntiy } from '@/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntiy]),AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
