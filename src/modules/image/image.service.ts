import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image, Post } from '../../entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private cloudinaryService: CloudinaryService,
  ) {}

  public async addImagesToDb(postImages: Image[], post: Post) {
    postImages.forEach(async (image) => this.imageRepository.save({ ...image, post }));
  }

  async uploadImages(images?: Express.Multer.File[]): Promise<Image[] | null> {
    if (!images || !images.length) {
      return null;
    }

    return Promise.all(
      images.map(async (image) => {
        const uploadedImage = await this.cloudinaryService.uploadImage(image);

        const imageName = uploadedImage.public_id;

        return this.imageRepository.create({
          path: imageName,
        });
      }),
    );
  }
}
