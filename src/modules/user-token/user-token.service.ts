import { Injectable } from '@nestjs/common';
import { logger } from '../../config';
import { Token, User } from '../../entity';
import { TokenRepository } from '../../repositories/TokenRespository';

@Injectable()
export class UserTokenService {
  static errorMessages = {
    canNotUpdateToken: '[updateRefreshToken]: can not update token',
  };

  constructor(private tokenRepository: TokenRepository) {}

  public updateUserToken = async (refreshToken: string, user: User): Promise<void> => {
    user.refresh_token.refresh_token = refreshToken;

    await this.tokenRepository.saveEntity(user.refresh_token);
  };

  public createToken = async (refresh_token: string, userId: string): Promise<void> => {
    this.tokenRepository.saveEntity({ refresh_token, user: userId });
  };

  public findRefreshToken = async (refresh_token: string): Promise<Token> =>
    this.tokenRepository.getOneBy({ refresh_token });

  public findTokenByUserId = async (userId: string): Promise<Token> => this.tokenRepository.getOneBy({ user: userId });

  public updateRefreshToken = async (token: string, newToken: string): Promise<void> => {
    const result = await this.tokenRepository.updateToken(token, newToken);
    if (!result.affected) {
      logger.error(UserTokenService.errorMessages.canNotUpdateToken, { token, newToken });
      throw new Error(UserTokenService.errorMessages.canNotUpdateToken);
    }
  };
}
