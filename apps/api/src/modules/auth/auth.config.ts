import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv.config();

export default registerAs('auth', () => ({
    jwtSecret: process.env.JWT_SECRET,
    signOptions: { 
        expiresIn: process.env.JWT_EXPIRE_IN

    },
}))



