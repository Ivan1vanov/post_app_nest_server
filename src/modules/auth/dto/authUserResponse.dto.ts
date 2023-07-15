import { User } from '../../../entity';
import { GeneratedTokens } from './JWT.dto';

export interface AuthUserResponse {
  user: User;
  tokens: GeneratedTokens;
}
