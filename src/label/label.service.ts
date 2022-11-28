import { AllLabelDto } from './dto/label.dto';
import { ResultData } from '@/common/utils/result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label, LabelEntity } from './entities/label.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(LabelEntity)
    private labelEntity: Repository<LabelEntity>,
    @InjectRepository(Label)
    private label: Repository<Label>
  ) { }


  /**
   * 创建标签
   * @param createLabelDto 
   * @returns 
   */
  async create(createLabelDto: CreateLabelDto, user: { id: string }) {
    try {
      const result = await this.label.findOne({ where: { labelName: createLabelDto.labelName } });
      if (result) {
        return ResultData.fail(400, '标签已经存在')
      }
      createLabelDto.userId = user.id;
      await this.label.save(createLabelDto);
      return ResultData.ok();
    } catch (error) {
      return ResultData.fail(500, error.message)
    }
  }

  /**
   * 分页查询标签 
   * @param allArticleDto 
   * @param user 
   * @returns 
   */
  async findAll(allLabelDto: AllLabelDto) {
    try {
      const [list, total] = await this.label.findAndCount(
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
    return `This action returns a #${id} label`;
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return `This action updates a #${id} label`;
  }

  async remove(id: number) {
    try {
      const labelResult = await this.label.findOne({ where: { id: id } })

      if (!labelResult) {
        return ResultData.fail(400, '标签不存在');
      }
      await this.label.remove(labelResult);
      return ResultData.ok();
    } catch (error) {
      return ResultData.fail(500, error.message);
    }
  }
}
