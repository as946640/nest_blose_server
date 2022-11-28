import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'
import { CategoryEntiy } from '@/category/entities/category.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { LabelEntity } from '../../label/entities/label.entity';


@Entity('article')
export class ArticleEntiy {
    @ApiProperty({ description: '文章id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @ApiProperty({ description: '文章标题' })
    @Column()
    public title: string;

    @ApiProperty({ description: '文章首图' })
    @Column()
    public haderUrl: string;

    @ApiProperty({ description: '文章内容' })
    @Column({ type: 'text' })
    public content: string;

    @ApiProperty({ description: '文章浏览量' })
    @Column({ default: 0 })
    public views: number;

    @ApiProperty({ description: '文章点赞量' })
    @Column({ default: 0 })
    public likes: number;

    @ApiProperty({ description: '文章是否点赞' })
    public isLike: boolean;

    @ApiProperty({ description: '文章是否收藏' })
    public isCollect: boolean;

    @ApiProperty({ description: '文章创建时间' })
    @CreateDateColumn()
    public createDate: Date;

    @ApiProperty({ description: '文章创建时间' })
    @UpdateDateColumn()
    public updateTime: Date;

    // 分类关系
    @ApiProperty({ description: '文章分类id' })
    @OneToMany(type => CategoryEntiy, categoryEntiy => categoryEntiy.article, { cascade: true })
    @JoinColumn()
    categroy: CategoryEntiy[]

    // 标签关系
    @ApiProperty({ description: '文章标签' })
    @JoinColumn()
    @OneToMany(type => LabelEntity, labelEntity => labelEntity.article, { cascade: true })
    labels: LabelEntity[]


    // 用户反向关系
    @ApiProperty({ description: '用户文章', type: () => UserEntity })
    @JoinColumn()
    @ManyToOne(type => UserEntity, userEntity => userEntity.article, { cascade: true })
    userInfo: UserEntity
}
