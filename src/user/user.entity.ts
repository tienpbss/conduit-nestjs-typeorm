import { Article } from 'src/article/article.entity';
import { Comment } from 'src/article/comment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => User, (user) => user.followers, { cascade: true })
  @JoinTable({ name: 'user_following_user' })
  followings: User[];

  @ManyToMany(() => User, (user) => user.followings)
  followers: User[];

  @ManyToMany(() => Article, (article) => article.favoriteBy, { cascade: true })
  @JoinTable({ name: 'user_favorite_article' })
  favorite: Article[];

  @OneToMany(() => Article, (article) => article.author, { cascade: true })
  authorOf: Article[];

  @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
  commented: Comment[];
}
