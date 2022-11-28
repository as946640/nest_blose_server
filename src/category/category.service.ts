import { ResultData } from '@/common/utils/result';
import { AllLabelDto } from '@/label/dto/label.dto';
import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntiy, Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntiy)
    private categoryEntiy: Repository<CategoryEntiy>,
    @InjectRepository(Category)
    private categroy: Repository<Category>
  ) { }


  /**
   * 创建分类
   * @param createCategoryDto 
   * @returns 
   */
  async create(createCategoryDto: CreateCategoryDto, user: { id: string, username: string }) {
    try {
      const category = await this.categroy.findOne({ where: { categoryName: createCategoryDto.categoryName } });
      if (category) {
        return ResultData.fail(400, '分类已存在')
      }
      createCategoryDto.userId = user.id;
      await this.categroy.save(createCategoryDto);
      return ResultData.ok();
    } catch (error) {
      return ResultData.fail(500, error.message)
    }
  }

  /**
   *  查询分类 有id就查询指定用户分类
   * @param allLabelDto 
   * @returns 
   */
  async findAll(allLabelDto: AllLabelDto) {
    try {
      const [list, total] = await this.categroy.findAndCount(
        {
          skip: allLabelDto.pageSize * (allLabelDto.page - 1),
          take: allLabelDto.pageSize
        }
      )
      return ResultData.ok({ list, total })
    } catch (error) {
      return ResultData.fail(500, error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const categoryResult = await this.categroy.findOne({ where: { id: id } })

    if (!categoryResult) {
      return ResultData.fail(400, '分类不存在');
    }
    await this.categroy.remove(categoryResult);
    return ResultData.ok();
  } catch(error) {
    return ResultData.fail(500, error.message);

  }
}
