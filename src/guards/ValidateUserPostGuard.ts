import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { configService, logger } from 'src/config';
import { UsersService } from '../modules/user/users.service';
import { JwtTokenPayload } from '../modules/auth';
import { PostService } from '../modules/post/post.service';

const JWT_TOKEN_INDEX = 1;

@Injectable()
export class ValidateUserPostGuard implements CanActivate {
  constructor(private usersService: UsersService, private postService: PostService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      const token = request.headers.authorization.split(' ')[JWT_TOKEN_INDEX];

      const { id } = jwt.verify(token, configService.get('JWT_SECRET')) as JwtTokenPayload;

      this.postService.user = await this.usersService.findUserById(id);
    } catch (error) {
      logger.warn('error message', { error });
      response.status(HttpStatus.UNAUTHORIZED);
      return false;
    }

    return true;
  }
}
