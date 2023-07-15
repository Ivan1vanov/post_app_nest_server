import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity';
import { Repository } from 'typeorm';
import { BaseRepository } from './baseRepository';

export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectRepository(Post)
    postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }
}
