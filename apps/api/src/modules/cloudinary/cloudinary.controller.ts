import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  //  file = champ du formaulaire associé
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; url: string }> {
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    return {
      message: 'Image uploaded successsfully',
      // url de l'image dans cloudinary
      url: uploadResult.secure_url,
    };
  }
}
