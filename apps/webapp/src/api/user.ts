import log from 'loglevel';
import { UserProfile } from '@baobbab/dtos';
import { apiClient } from './apiClient';

export const getUser = async (): Promise<UserProfile> => {
    try {
        const response = await apiClient.get('user').json<UserProfile>();
        log.info('response:', response);
        return response;
    } catch (error) {
        log.error('Error fetching user profile:', error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};
