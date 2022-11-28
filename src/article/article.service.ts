import { ArticleLikeEntity } from '@/article-like/entities/article-like.entity';
import { CategoryEntiy } from '@/category/entities/category.entity';
import { CollectEntity } from '@/collect/entities/collect.entity';
import { ResultData } from '@/common/utils/result';
import { LabelEntity } from '@/label/entities/label.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { AllArticleDto } from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntiy } from './entities/article.entity';

@Injectable()
export class ArticleService {


  constructor(
    @InjectRepository(ArticleEntiy)
    private articleEntiy: Repository<ArticleEntiy>,
    @InjectRepository(ArticleLikeEntity)
    private articleLikeEntity: Repository<ArticleLikeEntity>,
    @InjectRepository(CollectEntity)
    private articleCollectEntity: Repository<CollectEntity>
  ) { }

  /**
   * 添加文章
   * @param createArticleDto 
   * @returns 
   */
  create(createArticleDto: CreateArticleDto) {
    console.log(createArticleDto);

    return this.articleEntiy.save(createArticleDto).then(res => {
      return ResultData.ok()
    }).catch(err => {
      console.log(err);
      return ResultData.fail(500, err);
    })
  }

  /**
   * 分页查询文章
   * @param allArticleDto 
   * @returns 
   */
  async findAll(allArticleDto: AllArticleDto) {
    try {
      const qb = this.articleEntiy.createQueryBuilder('article')
        .leftJoinAndSelect("article.categroy", "categroy")
        .leftJoinAndSelect('article.labels', 'label')
        .skip(allArticleDto.pageSize * (allArticleDto.page - 1))
        .take(allArticleDto.pageSize);

      if (allArticleDto.category) {
        qb.andWhere('categroy.categoryName = :categoryName', { categoryName: allArticleDto.category })
      }
      if (allArticleDto.label) {
        qb.andWhere('labels.labelName = :name', { name: allArticleDto.label })
      }

      const [list, total] = await qb.getManyAndCount();
      return ResultData.ok({
        total,
        list
      });
    } catch (error) {
      return ResultData.fail(500, error.message);
    }
  }

  /**
   * 查询指定的文章
   * @param id -- 文章id
   * @returns 
   */
  async findOne(id: number) {
    try {
      const result = await this.articleEntiy.findOne({ relations: ["categroy", 'userInfo'], where: { id } });
      if (!result) {
        return ResultData.fail(500, '文章不存在');
      }
      
      // 点赞
      const isLike = await this.articleLikeEntity.findOne({where: {articleId: result.id, userId: result.userInfo.id}});
      result.isLike = isLike != null;
      // 收藏
      const isCollect = await this.articleCollectEntity.findOne({where: {articleId: result.id, userId: result.userInfo.id}});
      result.isCollect = isCollect != null;

      return ResultData.ok(result)
    } catch (error) {
      return ResultData.fail(500, error.message);
    }
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  /**
   * 删除文章
   * @param id 文章id
   * @returns 
   */
  async remove(id: number) {
    try {
      const article = await this.articleEntiy.findOne({ where: { id } })
      if (!article) {
        return ResultData.fail(500, '文章不存在')
      }
      await this.articleEntiy.remove(article);
      return ResultData.ok();
    } catch (error) {
      return ResultData.fail(500, error.message)
    }
  }
}
