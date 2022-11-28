import { ResultData } from '@/common/utils/result';
import { UserEntity } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentEntity: Repository<CommentEntity>,
  ) { }

  /**
   * 添加评论
   * @param createCommentDto 
   * @returns 
   */
  create(createCommentDto: CreateCommentDto, user: { id: number }) {

    createCommentDto.userId = user.id;
    return this.commentEntity.save(createCommentDto).then(res => {
      return ResultData.ok();
    }).catch(err => {
      return ResultData.fail(500, err.message)
    })
  }

  /**
   * 查询文章评论
   * @param articleId 
   * @returns 
   */
  async findAll(articleId: number) {
    try {
      const result = await this.commentEntity.createQueryBuilder('article_comment')
        .leftJoinAndMapOne('article_comment.user', UserEntity, 'user', 'user.id = article_comment.userId')
        .select(
          ['article_comment.id', 'article_comment.replyId', 'article_comment.comment', 'article_comment.createDate', 'user.id', 'user.avater', 'user.username']
        )
        .getMany();

      // 二级数据组装
      const lsit = this.getNestedChildren(result, 0);
      return ResultData.ok(lsit);
    } catch (error) {
      return ResultData.fail(error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  getNestedChildren(arr, parent) {
    const res = [];
    for (let item of arr) {
      if (item.replyId == parent) {
        const children = this.getNestedChildren(arr, item.id);
        if (children.length) {
          item.children = children;
        }
        res.push(item);
      }
    }
    return res;
  }
}
