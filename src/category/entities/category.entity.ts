import { ArticleEntiy } from "@/article/entities/article.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// 文章 分类元数据
@Entity('article_category')
export class CategoryEntiy {
    @ApiProperty({ description: '分类id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @ApiProperty({ description: '分类名称' })
    @Column()
    public categoryName: string;

    // 文章反向关系
    @ManyToOne(type => ArticleEntiy, articleEntiy => articleEntiy.categroy)
    article: ArticleEntiy
}

// 分类表
@Entity('categroy')
export class Category {
    @ApiProperty({ description: '分类id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @ApiProperty({ description: '分类名称' })
    @Column()
    public categoryName: string;

    @ApiProperty({ description: '用户id' })
    @Column({ type: 'bigint' })
    public userId: string;
}