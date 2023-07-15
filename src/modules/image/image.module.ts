import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../entity';

@Module({
  controllers: [],
  providers: [ImageService, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImageModule {}
