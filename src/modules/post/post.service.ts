import { Injectable } from '@nestjs/common';
import { User } from '../../entity';
import { CommentPost, CreatePost } from './types/post';
import { postRelations } from './constants/entity';
import { ImageService } from '../image/image.service';
import { PostServiceUtils } from './utils';
import { CommentRopository, PostRepository } from '../../repositories';
import { logger } from '../../config';

@Injectable()
export class PostService {
  public user: User;

  static errorMessages = {
    noPostToComment: '[commentPost]: can not find post by id',
  };

  constructor(
    private imageService: ImageService,
    private postRepository: PostRepository,
    private commentRopository: CommentRopository,
    private utils: PostServiceUtils = new PostServiceUtils(),
  ) {}

  public async createPost(postData: CreatePost, images: Express.Multer.File[]) {
    const postImages = await this.imageService.uploadImages(images);

    const newPost = await this.postRepository.saveEntity({
      ...postData,
      author: this.user,
      images: postImages,
    });

    if (postImages) {
      await this.imageService.addImagesToDb(postImages, newPost);
    }

    return newPost;
  }

  public async likePost(postId: string) {
    const postFromDB = await this.postRepository.getById(postId, [postRelations.likes]);

    postFromDB.likes = this.utils.likeControling(postFromDB, this.user);

    await this.postRepository.saveEntity(postFromDB);

    return postFromDB;
  }

  public async commentPost(postId: string, commentData: CommentPost) {
    const commentedPost = await this.postRepository.getById(postId, [postRelations.comments]);

    if (!commentedPost) {
      logger.error(PostService.errorMessages.noPostToComment, { postId, commentData });
      throw new Error(PostService.errorMessages.noPostToComment);
    }

    const newComment = await this.commentRopository.saveEntity({
      author: this.user,
      post: commentedPost,
      text: commentData.text,
    });

    return newComment;
  }
}
