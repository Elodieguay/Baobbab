// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('upload')
// export class CloudinaryController {
//   constructor(private readonly cloudinaryService: CloudinaryService) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadImage(
//     @UploadedFile() file: Express.Multer.File,
//   ): Promise<{ message: string; url: string }> {
//     const uploadResult = await this.cloudinaryService.uploadImage(file);
//     return {
//       message: 'Image uploaded successsfully',
//       url: uploadResult.secure_url,
//     };
//   }
// }
