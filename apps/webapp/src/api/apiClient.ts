import { config } from '../config';
import ky from 'ky';

export const apiClient = ky.create({
    prefixUrl: config.apiUrl,
    hooks: {
        beforeRequest: [
            (request) => {
                const token = sessionStorage.getItem('JWT_AUTH');
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
    },
});
