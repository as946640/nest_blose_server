import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ArticleLikeDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '文章id',
    })
    @IsNotEmpty({ message: '文章id不为空' })
    public id: number;
}