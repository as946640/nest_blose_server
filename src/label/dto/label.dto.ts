import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AllLabelDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '分页数',
    })
    @IsNotEmpty({ message: 'page不为空' })
    public page: number;

    @ApiProperty({
        required: true,
        default: null,
        description: '分页数量',
    })
    @IsNotEmpty({ message: 'pageSize不为空' })
    public pageSize: number;
}