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
    imageUploadParams: ImageUploadDTO
): Promise<ImageUploadResponse> => {
    const validationImage = imageUploadDTOSchema.safeParse(imageUploadParams);

    if (!validationImage.success) {
        throw new Error('Validation error: invalid input data');
    }

    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', imageUploadParams.data);
        if (imageUploadParams.maxValue) {
            formData.append('maxValue', imageUploadParams.maxValue.toString());
        }

        const url = `${config.apiUrl}/upload`;
        const response = (await ky
            .post(url, { body: formData })
            .json()) as ImageUploadResponse;
        return response;
    } catch (error) {
        log.error('error uploading image', error);
        throw error;
    }
};

export default imageUpload;
