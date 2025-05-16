import { config } from '@/config';
import {
    BookingResponse,
    CoursesDTOGeojson,
    CreateABooking,
    UserBooking,
} from '@baobbab/dtos';
import ky from 'ky';
import log from 'loglevel';

export const createBookingCourse = async (
    userId: string,
    createBooking: CreateABooking
) => {
    try {
        const url = `${config.apiUrl}/booking`;
        const response = await ky
            .post(url, { json: { createBooking, userId } })
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

export const getBookingCourse = async (bookingId: string) => {
    log.debug('je sui là haut');
    try {
        const url = `${config.apiUrl}/booking/${bookingId}`;
        const response = await ky.get(url).json<CoursesDTOGeojson>();
        log.info('response booking:', response);
        return response;
    } catch (error) {
        log.error(`Error to get all the bookings:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const getUserBooking = async (
    userId: string
): Promise<BookingResponse[]> => {
    try {
        const url = `${config.apiUrl}/booking/${userId}`;
        const response = await ky.get(url).json<BookingResponse[]>();
        log.debug('response getUserbooking:', response);
        return response;
    } catch (error) {
        log.error(`Error to get the user bookings`);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const getOrganisationUserBooking = async (
    organisationId: string,
    token: string
): Promise<UserBooking[]> => {
    try {
        const url = `${config.apiUrl}/booking/organisation/${organisationId}`;
        const response = await ky
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<UserBooking[]>();
        log.debug('response:', response);
        return response;
    } catch (error) {
        log.error(`Error to get the bookings for an organisation`);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const deleteUserBooking = async (bookingId: string, userId?: string) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    if (!bookingId) {
        throw new Error(' bookingId is missing');
    }

    try {
        const url = `${config.apiUrl}/booking/${bookingId}`;
        const response = await ky
            .delete(url, { json: { userId, bookingId } })
            .json();

        log.debug('Booking successfully deleted:', response);
        return response;
    } catch (error) {
        log.error(`Error deleting the booking:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const updateUserBooking = async (
    bookingId: string,
    userId: string,
    updateBooking: CreateABooking
) => {
    try {
        const url = `${config.apiUrl}/booking/${bookingId}`;
        const response = await ky
            .patch(url, { json: { userId, bookingId, updateBooking } })
            .json();

        log.debug('Booking successfully updated:', response);
        return response;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'unknown error'
        );
    }
};
