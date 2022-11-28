import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLabelDto {
    @ApiProperty({
        required: true,
        default: null,
        description: '标签名称',
    })
    @IsNotEmpty({ message: '标签名称不为空' })
    public labelName: string;

    public userId: string
}
