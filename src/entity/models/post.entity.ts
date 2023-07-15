import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { User } from './Users.entity';
import { Comments } from './comment.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.liked_posts)
  @JoinTable()
  likes: User[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Comments, (userInfo) => userInfo.post)
  comments: Comments[];

  @Column({ nullable: true })
  reposts: string;
}
