import { ArticleEntiy } from "../../article/entities/article.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('article_label')
export class LabelEntity {
    @ApiProperty({ description: '标签id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @ApiProperty({ description: '标签名称' })
    @Column()
    public labelName: string;

    // 文章反向关系
    @ManyToOne(type => ArticleEntiy, articleEntiy => articleEntiy.labels)
    article: ArticleEntiy
}

// 分类表
@Entity('label')
export class Label {
    @ApiProperty({ description: '分类id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @ApiProperty({ description: '分类名称' })
    @Column()
    public labelName: string;

    @ApiProperty({ description: '用户id' })
    @Column({ type: 'bigint' })
    public userId: string;
}
