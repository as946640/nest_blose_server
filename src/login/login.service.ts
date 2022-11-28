import { Injectable, Res } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { ResultData } from '@/common/utils/result'
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
 
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  create(createLoginDto: CreateLoginDto,) {
    console.log(createLoginDto);

    return ResultData.ok();
  }
}
