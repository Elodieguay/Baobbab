import {
    OrganisationAuthResponse,
    OrganisationCompleteInfo,
    OrganisationInfosDTO,
} from '@baobbab/dtos';
// import { loginOrganisationSchema } from './auth';
import log from 'loglevel';
import { config } from '../config';
import ky from 'ky';

export const getOrganisation = async (token: string) => {
    try {
        const url = `${config.apiUrl}/organisation`;
        const response = await ky
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<OrganisationAuthResponse>();
        return response;
    } catch (error) {
        log.error('Error fetching organisation profile:', error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const getOrganisationById = async (
    organisationId: string
): Promise<OrganisationCompleteInfo> => {
    if (typeof organisationId !== 'string' || !organisationId.trim()) {
        log.error('Invalid organisation Id');
    }

    try {
        const url = `${config.apiUrl}/organisation/${organisationId}`;
        const response = await ky.get(url).json<OrganisationCompleteInfo>();
        return response;
    } catch (error) {
        log.error(`Error to get organisation information:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};

export const updateOrganisationInfos = async ({
    organisationId,
    updateOrganisationInfo,
}: {
    organisationId: string;
    updateOrganisationInfo: OrganisationInfosDTO;
}): Promise<OrganisationInfosDTO> => {
    if (typeof organisationId !== 'string' || !organisationId.trim()) {
        log.error('Invalid organisation Id');
        throw new Error('Invalid organisation Id');
    }
    try {
        const url = `${config.apiUrl}/organisation/${organisationId}`;
        const response = await ky
            .patch(url, { json: updateOrganisationInfo })
            .json<OrganisationInfosDTO>();
        return response;
    } catch (error) {
        log.error(`Error to update the  organisation'information:`, error);
        throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
        );
    }
};
