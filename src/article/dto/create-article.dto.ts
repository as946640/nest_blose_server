import { CategoryEntiy } from "@/category/entities/category.entity";
import { LabelEntity } from "@/label/entities/label.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateArticleDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '文章标题',
    })
    @IsNotEmpty({ message: '文章标题不为空' })
    public title: string;

    @ApiProperty({
        required: true,
        default: null,
        description: '文章图片',
    })
    public haderUrl: string;

    @ApiProperty({
        required: true,
        default: null,
        description: '文章内容',
    })
    @IsNotEmpty({ message: '文章内容不为空' })
    public content: string;

    @ApiProperty({
        default: null,
        description: '文章标签',
    })
    public labels: LabelEntity[];


    @ApiProperty({
        default: null,
        description: '文章分类',
    })
    public categroy: CategoryEntiy[];

    @ApiProperty({
        default: null,
        description: '文章id 更新使用',
    })
    public id: number;
}
