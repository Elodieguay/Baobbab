import { imageUploadDTOSchema } from '@/components/form/input/TestImageFile';
import { config } from '@/config';
import ky from 'ky';
import log from 'loglevel';

export interface ImageUploadDTO {
    data: File;
    maxValue?: number;
}

export interface ImageUploadResponse {
    message: string;
    url: string;
}

const imageUpload = async (
    organisationId: string,
    imageUploadParams: ImageUploadDTO
): Promise<ImageUploadResponse> => {
    log.info('imageuploadparams', imageUploadParams);
    const validationImage = imageUploadDTOSchema.safeParse(imageUploadParams);

    if (!validationImage.success) {
        throw new Error('Validation error: invalid input data');
    }

    try {
        const formData = new FormData();
        log.info('formdata', formData);
        formData.append('file', imageUploadParams.data);
        if (imageUploadParams.maxValue) {
            formData.append('maxValue', imageUploadParams.maxValue.toString());
        }

        const url = `${config.apiUrl}/uploadImage/${organisationId}`;
        const response = (await ky
            .post(url, { body: formData })
            .json()) as ImageUploadResponse;
        log.info('imageupload', response);
        return response;
    } catch (error) {
        log.error('error uploading image', error);
        throw error;
    }
};

export default imageUpload;
