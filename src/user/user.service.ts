import { ArticleEntiy } from '@/article/entities/article.entity';
import { AuthService } from '@/auth/auth.service';
import { decrypt, encryption } from '@/common/utils/encryption';
import { ResultData } from '@/common/utils/result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntiy)
    private articleRepositrty: Repository<ArticleEntiy>,
    private readonly authService: AuthService,
  ) { }

  /**
   * 创建用户
   * @param createUserDto 
   * @returns 
   */
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        username: createUserDto.username
      }
    });
    if (user) return ResultData.fail(500, '用户已存在');
    createUserDto.password = await encryption(createUserDto.password);
    this.usersRepository.save(createUserDto);
    return ResultData.ok();
  }

  /**
   * 用户登录
   * @param userLoginDto 
   * @returns UserEntity
   */
  login(userLoginDto: UserLoginDto) {
    return this.usersRepository.findOne({
      where: {
        username: userLoginDto.username
      }
    }).then(async (res: any) => {
      if (!res) return ResultData.fail(500, '用户不存在');
      if (! await decrypt(userLoginDto.password, res.password)) {
        return ResultData.fail(500, '密码不正确');
      }

      const token = this.authService.genToken({ id: res.id, username: res.username })
      res.token = token.accessToken;
      return ResultData.ok(res);
    }).catch(err => {
      return ResultData.fail(500, err.message);
    })
  }

  findAll() {
    return `This action returns all user`;
  }


  /**
   * 获取用户文章
   * @param allArticleDto 
   * @param user 
   * @returns 
   */
  async findAllArticle(allArticleDto, user: { id: number }) {
    try {
      console.log(user);
      
      const [list, total] = await this.articleRepositrty.createQueryBuilder('article')
        .innerJoin("article.userInfo", "user")
        .where('user.id = :id', { id: user.id })
        .skip(allArticleDto.pageSize * (allArticleDto.page - 1))
        .take(allArticleDto.pageSize)
        .getManyAndCount();
      return ResultData.ok({ total, list });
    } catch (error) {
      return ResultData.fail(500, error.message);
    }
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } }).then(res => {
      return ResultData.ok(res);
    }).catch(err => {
      return ResultData.fail(500, err);
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
