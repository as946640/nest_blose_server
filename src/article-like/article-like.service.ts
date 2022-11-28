import { Injectable } from '@nestjs/common';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { ArticleLikeEntity } from './entities/article-like.entity';
import { ResultData } from '@/common/utils/result';
import { ArticleEntiy } from '@/article/entities/article.entity';


@Injectable()
export class ArticleLikeService {

  constructor(
    @InjectRepository(ArticleLikeEntity)
    private articleLike: Repository<ArticleLikeEntity>

  ) { }

  create(createArticleLikeDto: CreateArticleLikeDto) {
    return this.articleLike.findOne({ where: { userId: createArticleLikeDto.userId } }).then(res => {
      if (res) {
        return ResultData.fail(400, '已经点赞过了')
      }
      return this.articleLike.save(createArticleLikeDto).then(res => {
        return ResultData.ok(null, '点赞成功')
      }).catch(err => {
        return ResultData.fail(500, err.message)
      })
    }).catch(err => {
      return ResultData.fail(500, err.message)
    })
  }

  /**
   * 分页获取用户点赞
   * @returns 
   */
  async findAll(allCollectDto, user: { id: number }) {
    try {
      const [list, total] = await this.articleLike.createQueryBuilder('article_like')
        .leftJoinAndMapOne('article_like.article', ArticleEntiy, 'article', 'article.id = article_like.articleId')
        .where('article_like.userId = :userId', { userId: user.id })
        .skip(allCollectDto.pageSize * (allCollectDto.page - 1))
        .take(allCollectDto.pageSize)
        .getManyAndCount();

      return ResultData.ok({
        total, list
      })
    } catch (error) {
      return ResultData.fail(500, error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} articleLike`;
  }

  update(id: number, updateArticleLikeDto: UpdateArticleLikeDto) {
    return `This action updates a #${id} articleLike`;
  }

  /**
   * 取消点赞
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.articleLike.findOne({ where: { articleId: id } }).then(res => {
      if (!res) {
        return ResultData.fail(400, '请先点赞')
      }

      return this.articleLike.remove(res).then(res => {
        return ResultData.fail(null, '取消点赞成功')
      }).catch(err => {
        return ResultData.fail(500, err.message)
      })
    }).catch(err => {
      return ResultData.fail(500, err.message)
    })
  }
}
