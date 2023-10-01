import { Article } from 'src/article/article.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
