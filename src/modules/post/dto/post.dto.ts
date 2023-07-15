import { User } from '../../../entity';

export class CreatePostDTO {
  userFromDb: User;
  author: number;
  description: string;
  images?: string[];
}

export class CommentPostDTO {
  text: string;
}
