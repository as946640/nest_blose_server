import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
const qiniu = require('qiniu');
import config from '@/config';
import { ResultData } from '@/common/utils/result';

@Injectable()
export class UploadService {
  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  /**
   * 获取七牛云 token
   */
  getToken() {
    const mac = new qiniu.auth.digest.Mac(config.ak, config.sk);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: config.bucket
    });
    const uploadToken = putPolicy.uploadToken(mac);
    return ResultData.ok({
      token: uploadToken
    });
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
