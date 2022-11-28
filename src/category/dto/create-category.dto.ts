import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '分类名称',
    })
    @IsNotEmpty({ message: '分类名称不为空' })
    public categoryName: string;


    userId: string;
}
