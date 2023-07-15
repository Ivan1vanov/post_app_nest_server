import { JoinColumn, OneToOne, Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './Users.entity';

@Entity('tokens')
export class Token extends BaseEntity {
  @OneToOne(() => User, (user) => user.refresh_token)
  @JoinColumn()
  user: string;

  @Column()
  refresh_token: string;
}
