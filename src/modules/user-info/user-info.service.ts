import { Injectable } from '@nestjs/common';
import { UserInfo } from '../../entity';
import { logger } from '../../config';
import { UserInfoRepository } from '../../repositories';

@Injectable()
export class UserInfoService {
  static errorMessages = {
    canNotUpdateInfo: '[updateInfo]: can not update info for user',
  };

  constructor(private userInfoRepository: UserInfoRepository) {}

  public async createInfo(info: unknown) {
    this.userInfoRepository.saveEntity(info);
  }

  public async updateInfo(userInfo: UserInfo) {
    const result = await this.userInfoRepository.updateUserInfo(userInfo);

    if (!result.affected) {
      logger.error(UserInfoService.errorMessages.canNotUpdateInfo, { userInfo });
      throw new Error(UserInfoService.errorMessages.canNotUpdateInfo);
    }

    return userInfo;
  }
}
