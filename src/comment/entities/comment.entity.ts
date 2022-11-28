import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm";

@Entity('article_comment')
export class CommentEntity {
    @ApiProperty({ description: '评论id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number

    @ApiProperty({ description: '评论内容' })
    @Column()
    public comment: string;

    @ApiProperty({ description: '评论时间' })
    @CreateDateColumn()
    public createDate: Date;

    @ApiProperty({ description: '用户id' })
    @Column({ type: 'bigint' })
    public userId: number;

    @ApiProperty({ description: '回复用户id' })
    @Column({ type: 'bigint', default: 0 })
    public replyId: number;

    @ApiProperty({ description: '文章id' })
    @Column({ type: 'bigint' })
    public articleId: number;
}
