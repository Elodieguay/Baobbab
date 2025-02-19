import { config } from '@/config';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import ky from 'ky';
import log from 'loglevel';

export const getCourses = async (): Promise<CoursesDTOGeojson> => {
    try {
        const url = `${config.apiUrl}/courses`;
        const response = await ky.get(url).json<CoursesDTOGeojson>();
        return response;
    } catch (error) {
        log.error(`Error to get all the courses:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const getCourseById = async (
    courseId: string
): Promise<CoursesDTOGeojson> => {
    try {
        const url = `${config.apiUrl}/courses/${courseId}`;
        const response = await ky.get(url).json<CoursesDTOGeojson>();
        return response;
    } catch (error) {
        log.error(`Error to get a course by his id`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Uknown error'
        );
    }
};
