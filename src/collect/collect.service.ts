import { ArticleEntiy } from '@/article/entities/article.entity';
import { ResultData } from '@/common/utils/result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectDto } from './dto/create-collect.dto';
import { UpdateCollectDto } from './dto/update-collect.dto';
import { CollectEntity } from './entities/collect.entity';

@Injectable()
export class CollectService {

  constructor(
    @InjectRepository(CollectEntity)
    private collectEntity: Repository<CollectEntity>
  ) { }


  /**
   * 文章收藏
   * @param createCollectDto 
   * @returns 
   */
  create(createCollectDto: CreateCollectDto) {
    return this.collectEntity.findOne({ where: { userId: createCollectDto.userId, articleId: createCollectDto.articleId } })
      .then(res => {
        if (res) {
          return ResultData.fail(400, '已经收藏过了')
        }
        return this.collectEntity.save(createCollectDto).then(res => {
          return ResultData.ok(null, '收藏成功')
        }).catch(err => {
          return ResultData.fail(500, err.message)
        })
      }).catch(err => {
        return ResultData.fail(500, err.message)
      })
  }

  /**
   * 分页获取用户收藏
   * @returns 
   */
  async findAll(allCollectDto, user: { id: number }) {
    try {
      const [list, total] = await this.collectEntity.createQueryBuilder('article_collect')
        .leftJoinAndMapOne('article_collect.article', ArticleEntiy, 'article', 'article.id = article_collect.articleId')
        .where('article_collect.userId = :userId', { userId: user.id })
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
    return `This action returns a #${id} collect`;
  }

  update(id: number, updateCollectDto: UpdateCollectDto) {
    return `This action updates a #${id} collect`;
  }

  /**
   * 取消收藏
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.collectEntity.findOne({ where: { articleId: id } }).then(res => {
      if (!res) {
        return ResultData.fail(400, '请先收藏')
      }

      return this.collectEntity.remove(res).then(res => {
        return ResultData.fail(null, '取消收藏成功')
      }).catch(err => {
        return ResultData.fail(500, err.message)
      })
    }).catch(err => {
      return ResultData.fail(500, err.message)
    })
  }
}
