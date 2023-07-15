import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity('images')
export class Image extends BaseEntity {
  @Column()
  path: string;

  @ManyToOne(() => Post, (post) => post.images)
  post: Post;
}
