import { config } from '@/config';
import { CreateABooking } from '@baobbab/dtos';
import ky from 'ky';
import log from 'loglevel';

export const createBookingCourse = async (createBooking: CreateABooking) => {
    try {
        const url = `${config.apiUrl}/booking`;
        const response = await ky
            .post(url, { json: createBooking })
            .json<CreateABooking>();
        log.debug('response:', response);
        return response;
    } catch (error) {
        log.error(`Error to create a booking:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const getBookingCourse = async () => {
    try {
        const url = `${config.apiUrl}/booking`;
        const response = await ky.get(url).json<CreateABooking>();
        log.debug('response:', response);
        return response;
    } catch (error) {
        log.error(`Error to get all the bookings:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};
