import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('article_like')
export class ArticleLikeEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number

    @ApiProperty({ description: '文章id' })
    @Column({ type: 'bigint' })
    public articleId: number;

    @ApiProperty({ description: '用户id' })
    @Column({ type: 'bigint' })
    public userId: number;
}
