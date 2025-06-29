import ky from 'ky';
import { config } from '@/config';
import log from 'loglevel';
import { UserDTO, UserProfile } from '@baobbab/dtos';

export const getUser = async (token: string): Promise<UserProfile> => {
    try {
        const url = `${config.apiUrl}/user`;
        const response = await ky
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<UserDTO>();

        log.info('response:', response);
        return response;
    } catch (error) {
        log.error('Error fetching user profile:', error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};
