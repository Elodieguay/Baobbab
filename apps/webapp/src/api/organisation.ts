import {
    OrganisationCompleteInfo,
    OrganisationInfosDTO,
    OrganisationProfile,
} from '@baobbab/dtos';
import log from 'loglevel';
import { apiClient } from './apiClient';

export const getOrganisation = async () => {
    try {
        const response = await apiClient
            .get('organisation')
            .json<OrganisationProfile>();
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
    log.debug('organisationId', organisationId);
    try {
        const url = `organisation/${organisationId}`;
        const response = await apiClient
            .get(url)
            .json<OrganisationCompleteInfo>();
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
        const url = `organisation/${organisationId}`;
        const response = await apiClient
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
