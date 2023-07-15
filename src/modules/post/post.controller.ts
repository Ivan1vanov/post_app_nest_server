import { Controller, Post, Body, UseGuards, Put, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { CommentPostDTO, CreatePostDTO } from './dto/post.dto';
import { idParamNames, postRouter } from './constants/Routes';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { ValidateUserPostGuard } from '../../guards';

@Controller(postRouter.post)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(postRouter.create)
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(ValidateUserPostGuard)
  async createPost(@Body() postData: CreatePostDTO, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.postService.createPost(postData, files);
  }

  @Put(postRouter.like(idParamNames.postId))
  @UseGuards(ValidateUserPostGuard)
  async likePost(@Param(idParamNames.postId) postId: string) {
    return this.postService.likePost(postId);
  }

  @Post(postRouter.comment(idParamNames.postId))
  @UseGuards(ValidateUserPostGuard)
  async commentPost(@Param(idParamNames.postId) postId: string, @Body() commentData: CommentPostDTO) {
    return this.postService.commentPost(postId, commentData);
  }
}
