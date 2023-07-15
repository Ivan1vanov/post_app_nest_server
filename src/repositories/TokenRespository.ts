import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Token } from '../entity';
import { BaseRepository } from './baseRepository';

export class TokenRepository extends BaseRepository<Token> {
  constructor(
    @InjectRepository(Token)
    public tokenRpository: Repository<Token>,
  ) {
    super(tokenRpository);
  }

  updateToken = (token: string, newToken: string): Promise<UpdateResult> =>
    this.tokenRpository.update(
      {
        refresh_token: token,
      },
      { refresh_token: newToken },
    );
}
