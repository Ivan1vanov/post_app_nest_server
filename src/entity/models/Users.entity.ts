import { UserInfo } from './userInfo.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
import { Comments } from './comment.entity';
import { Token } from './token.entity';

@Entity('users')
export class User extends BaseEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  is_blocked: boolean;

  @Column({ default: null, nullable: true })
  blocked_at: Date;

  @Column({ default: '' })
  avatar: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, { nullable: true })
  user_info: UserInfo;

  @OneToMany(() => Post, (post) => post.author, { nullable: true })
  posts: Post[];

  @OneToMany(() => Comments, (post) => post.author, { nullable: true })
  comments: Comments[];

  @Column()
  password: string;

  @ManyToMany(() => Post, (post) => post.likes, { nullable: true })
  @JoinTable()
  liked_posts: Post;

  @OneToOne(() => Token, (token) => token.user, { nullable: true })
  refresh_token: Token;
}
