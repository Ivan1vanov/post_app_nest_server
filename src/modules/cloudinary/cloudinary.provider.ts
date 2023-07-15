import { v2 } from 'cloudinary';
import { configService } from '../../config/config';
import { CLOUDINARY } from './constants/cloudinaru.constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: configService.get('CLOUDINARY_USER_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  },
};
