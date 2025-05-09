import {
  Body,
  Controller,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploadImage')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('organisationId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('organisationId') organisationId: string,
    // @Req() req: Request
  ): Promise<{ message: string; url: string }> {
    const uploadResult = await this.cloudinaryService.uploadImage(
      organisationId,
      file,
    );
    return {
      message: 'Image uploaded successsfully',
      url: uploadResult.secure_url,
    };
  }
}
