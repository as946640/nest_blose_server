import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateArticleLikeDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '文章id',
    })
    @IsNotEmpty({ message: '文章id不为空' })
    public articleId: number;

    @ApiProperty({
        required: true,
        default: null,
        description: '用户id',
    })
    @IsNotEmpty({ message: '用户id不为空' })
    public userId: number;
}
