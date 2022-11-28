import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'
import { ArticleEntiy } from '@/article/entities/article.entity';

@Entity('user')
export class UserEntity {
    @ApiProperty({ description: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @ApiProperty({ description: '用户邮箱' })
    @Column()
    public email: string;

    @ApiProperty({ description: '登录账户名称' })
    @Column()
    public username: string;

    @ApiProperty({ description: '用户密码-加密' })
    @Column()
    public password: string;

    @ApiProperty({ description: '用户名称' })
    @Column({ default: '', comment: '用户名称' })
    public nikename: string;

    @ApiProperty({ description: '用户手机号' })
    @Column({ default: null, comment: '用户手机号' })
    public phone: number;

    @ApiProperty({ description: '用户头像' })
    @Column({ default: '', comment: '用户头像' })
    public avater: string;

    // 文章关系
    @ApiProperty({ description: '用户文章' })
    @OneToMany(type => ArticleEntiy, ArticleEntiy => ArticleEntiy.userInfo)
    article: ArticleEntiy[]
}

