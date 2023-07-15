import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity';
import { BaseRepository } from './baseRepository';

export class UserRepository extends BaseRepository<User> {
  static errorMessages = {
    noUserbyEmail: '[getByEmail]: can not find user by provided email address',
  };

  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  public getByEmail = async (email: string): Promise<User> => this.getOneBy({ email });

  public updateAvatar = async (userId: string, imageId: string): Promise<UpdateResult> =>
    this.userRepository.update(
      {
        id: userId,
      },
      {
        avatar: imageId,
      },
    );
}
