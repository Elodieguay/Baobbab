import { registerAs } from "@nestjs/config";

export default registerAs('orm', () => ({
    sync: ['true', '1'].includes(process.env.ORM_SYNC || '') || false,
}))