import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from '../entity';
import { Repository, UpdateResult } from 'typeorm';
import { BaseRepository } from './baseRepository';

export class UserInfoRepository extends BaseRepository<UserInfo> {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {
    super(userInfoRepository);
  }

  public updateUserInfo = async (userInfo: UserInfo): Promise<UpdateResult> =>
    this.userInfoRepository.update(
      {
        user: userInfo.user,
      },
      {
        ...userInfo,
      },
    );
}
