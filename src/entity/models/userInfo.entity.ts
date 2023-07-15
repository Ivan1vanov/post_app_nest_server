import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './Users.entity';

@Entity('users_info')
export class UserInfo extends BaseEntity {
  @Column({ length: 30 })
  first_name: string;

  @Column({ length: 30 })
  last_name: string;

  @Column({ nullable: true })
  birthday_date: Date;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  languages: string;

  @OneToOne(() => User, (user) => user.user_info, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: string;
}
