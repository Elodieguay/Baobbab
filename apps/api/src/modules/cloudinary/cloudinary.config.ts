import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();
//@typescript-eslint/explicit-function-return-type
export const configCloudinary = (): ConfigOptions => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  return cloudinary.config();
};
