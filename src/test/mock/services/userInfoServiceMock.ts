import { UserInfoService } from '../../../modules/user-info/user-info.service';

export const userInfoServiceMock = {
  createInfo: jest.fn(),
} as unknown as jest.Mocked<UserInfoService>;
