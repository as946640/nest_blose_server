import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserPhoneDto, UserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { ApiResult } from '@/common/utils/ApiResult';
import { UserEntity } from './entities/user.entity'
import { ResultData } from '@/common/utils/result';
import { AllowAnon } from '@/common/decorators/allow-anon.decorator';
import { ArticleEntiy } from '@/article/entities/article.entity';

@ApiTags('用户管理')
@Controller('user')
@ApiExtraModels(ResultData, UserEntity, ArticleEntiy)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  @ApiResult(UserEntity)
  @AllowAnon()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @ApiResult(UserEntity)
  @AllowAnon()
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }

  // @Post('/loginPhone')
  // @ApiResult(UserEntity)
  // @AllowAnon()
  // createPhone(@Body() createUserPhoneDto: CreateUserPhoneDto) {
  //   return this.userService.create(createUserPhoneDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/article')
  @ApiResult(UserEntity)
  findAllArticle(@Query() allArticleDto: { pageSize: number, page: number }, @Req() req) {
    return this.userService.findAllArticle(allArticleDto, req.user);
  }

  @Get(':id')
  @ApiResult(UserEntity)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
