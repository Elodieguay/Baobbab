import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { configCloudinary } from './cloudinary.config';

export type UploadImage = {
  url: string;
  id: string;
};

@Injectable()
export class CloudinaryService {
  constructor() {
    configCloudinary();
  }

  uploadImage = (file: Express.Multer.File): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'baobbab-courses' },
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(file.buffer);
    });
  };

  // Méthode pour supprimer une image
  async deleteImage(publicId: string): Promise<{ result: string }> {
    return cloudinary.uploader.destroy(publicId);
  }
}
