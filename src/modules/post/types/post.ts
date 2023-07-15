export interface CreatePost {
  author: number;
  description: string;
  images?: string[];
}

export interface CommentPost {
  text: string;
}
