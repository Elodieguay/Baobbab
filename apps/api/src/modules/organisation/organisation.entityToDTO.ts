import { OrganisationCompleteInfo } from '@baobbab/dtos';
import { Organisation } from 'src/entities/organisation.entity';

export function organisationToDto(org: Organisation): OrganisationCompleteInfo {
  return {
    id: org.id,
    organisationName: org.organisationName,
    email: org.email,
    firstname: org.organisationInfos?.firstname ?? '',
    lastname: org.organisationInfos?.lastname ?? '',
    phone: org.organisationInfos?.phone ?? '',
    address: org.organisationInfos?.address ?? '',
    bio: org.organisationInfos?.bio ?? '',
    website: org.organisationInfos?.website ?? '',
    socialMediaInstagram: org.organisationInfos?.socialMediaInstagram ?? '',
    socialMediaFaceBook: org.organisationInfos?.socialMediaFaceBook ?? '',
    socialMediaTwitter: org.organisationInfos?.socialMediaTwitter ?? '',
    image: org.organisationInfos?.image,
    createdAt: org.organisationInfos?.createdAt,
    updatedAt: org.organisationInfos?.updatedAt,
  };
}
