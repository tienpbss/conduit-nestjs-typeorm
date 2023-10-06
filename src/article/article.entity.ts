import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Tag } from 'src/tag/tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  body: string;

  @CreateDateColumn({})
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToMany(() => User, (user) => user.favorite, { cascade: true })
  favoriteBy: User[];

  @ManyToOne(() => User, (user) => user.authorOf, { cascade: true })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  @JoinTable({ name: 'article_tag' })
  tags: Tag[];
}
