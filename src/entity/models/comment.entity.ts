import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './Users.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comments extends BaseEntity {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  text: string;
}
