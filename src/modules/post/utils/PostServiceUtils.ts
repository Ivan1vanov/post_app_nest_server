import { Post } from '../../../entity';
import { User } from '../../../entity/models/Users.entity';

export class PostServiceUtils {
  public likeControling(postFromDB: Post, user: User) {
    const likeIndex = postFromDB.likes.findIndex((user) => user.id === user.id);

    if (likeIndex >= 0) {
      postFromDB.likes = postFromDB.likes.filter((user) => user.id !== user.id);
    }

    if (likeIndex === -1) {
      postFromDB.likes.push(user);
    }

    return postFromDB.likes;
  }
}
