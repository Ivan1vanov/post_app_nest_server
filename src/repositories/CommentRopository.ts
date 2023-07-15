import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from '../entity';
import { Repository } from 'typeorm';
import { BaseRepository } from './baseRepository';

export class CommentRopository extends BaseRepository<Comments> {
  constructor(
    @InjectRepository(Comments)
    commentRepository: Repository<Comments>,
  ) {
    super(commentRepository);
  }
}
