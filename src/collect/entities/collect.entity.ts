import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('article_collect')
export class CollectEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number

    @ApiProperty({ description: '文章id' })
    @Column({ type: 'bigint' })
    public articleId: number;

    @ApiProperty({ description: '用户id' })
    @Column({ type: 'bigint' })
    public userId: number;
}
