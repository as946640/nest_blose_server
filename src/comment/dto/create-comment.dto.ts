import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
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
        description: '文章id',
    })
    @IsNotEmpty({ message: '评论内容不为空' })
    public comment: string;

    @ApiProperty({
        required: true,
        default: null,
        description: '文章id',
    })
    public replyId: number | null;

    public userId: number;
}
