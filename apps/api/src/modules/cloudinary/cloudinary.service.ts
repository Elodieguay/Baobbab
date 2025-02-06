import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      return await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'baobbab-courses',
              format: 'webp',
              quality: 'auto:good',
              width: 1280,
              crop: 'limit',
            },
            (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if (error) {
                Logger.error(
                  `Erreur lors de l'upload Cloudinary: ${error.message}`,
                  error.stack,
                );
                reject(
                  new InternalServerErrorException(
                    'Échec de l’upload de l’image.',
                  ),
                );
              } else {
                Logger.log(`Image uploadée avec succès: ${result.secure_url}`);
                resolve(result);
              }
            },
          )
          .end(file.buffer);
      });
    } catch (error) {
      Logger.error(
        'Une erreur inattendue est survenue lors de l’upload',
        error.stack,
      );
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de l’upload de l’image.',
      );
    }
  }

  // Méthode pour supprimer une image
  async deleteImage(publicId: string): Promise<{ result: string }> {
    try {
      return cloudinary.uploader.destroy(publicId);
    } catch (error) {
      Logger.error(
        'Une erreur est survenue lors de la suppression de l’image',
        error.stack,
      );
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la suppression de l’image.',
      );
    }
  }
}
