import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsEmail } from 'class-validator';

// 创建用户
export class CreateUserDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '用户邮箱',
    })
    @IsEmail({ message: '请填写正确的邮箱' })
    @IsNotEmpty({ message: '邮箱不能为空' })
    public email: string;

    @ApiProperty({
        required: true,
        default: null,
        description: '用户账号',
    })
    @IsNotEmpty({ message: '用户账号不能为空' })
    public username: string;

    @ApiProperty({
        required: true,
        default: null,
        description: '用户密码',
    })
    @IsNotEmpty({ message: '密码不能为空' })
    public password: string;
}

// 手机注册用户
export class CreateUserPhoneDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '用户手机号',
    })
    @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
    @IsNotEmpty({ message: '手机号不能为空' })
    phone: number;
}

// 用户登录
export class UserLoginDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '用户账号',
    })
    @IsNotEmpty({ message: '用户账号不能为空' })
    public username: string;

    @ApiProperty({
        required: true,
        default: null,
        description: '用户密码',
    })
    @IsNotEmpty({ message: '密码不能为空' })
    public password: string;
}
