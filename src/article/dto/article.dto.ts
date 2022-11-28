import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class AllArticleDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '分页数',
    })
    // @IsNotEmpty({ message: '分页数不为空' })
    public page: number;

    @ApiProperty({
        required: true,
        default: null,
        description: '分页数量',
    })
    // @IsNotEmpty({ message: '分页数量不为空' })
    public pageSize: number;

    @ApiProperty({
        required: false,
        default: null,
        description: '分类名称',
    })
    public category: string;

    @ApiProperty({
        required: false,
        default: null,
        description: '标签名称',
    })
    public label: string;
} 