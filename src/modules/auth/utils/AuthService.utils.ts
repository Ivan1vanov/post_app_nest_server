import { JwtService } from '@nestjs/jwt';
import { configService } from '../../../config/config';
import { TokenData, JwtTokenPayload } from '../dto/JWT.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../../../entity';
import { logger } from '../../../config';

export class AuthServiceUtils {
  constructor(public jwtService: JwtService = new JwtService()) {}

  static errorMessages = {
    canNotVerifyToken: 'Error during token verifying',
  };

  public generateJwtToken = async (payload: JwtTokenPayload, configKey, expiresIn) =>
    this.jwtService.signAsync(
      {
        payload,
      },
      {
        secret: configService.get(configKey),
        expiresIn,
      },
    );

  public async generateTokensForUser(user: User) {
    const payload = this.getTokenPayload(user);

    const accessToken = await this.generateJwtToken(payload, 'JWT_SECRET', '30h');

    const refreshToken = await await this.generateJwtToken(payload, 'JWT_REFRESH_SECRET', '30d');

    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken = async (token: string): Promise<TokenData> => {
    try {
      const tokenData = await this.jwtService.verify<TokenData>(token, {
        publicKey: configService.get('JWT_REFRESH_SECRET'),
      });

      return tokenData;
    } catch (error) {
      logger.warn(AuthServiceUtils.errorMessages.canNotVerifyToken, {
        error,
      });
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  };

  public getTokenPayload = ({ id, email }: User): JwtTokenPayload => ({ id, email });
}
