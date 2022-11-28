import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '用户手机号',
    })
    phone: number;
}
