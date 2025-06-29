import { useAuth } from '@/context/Auth.context';
import { useGetUserBooking } from '@/hooks/booking/query';
import { useOrganisationById } from '@/hooks/organisation/useOrganisation';
import { useGetUser } from '@/hooks/user/query';
import log from 'loglevel';
import { useEffect, useMemo, useState } from 'react';

export const useGetOrganisationInfoController = () => {
    const { authData } = useAuth();
    const { data } = useGetUser(authData?.token || '');
    const userId = data?.id;
    const { data: userBooking } = useGetUserBooking(userId || '');
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [organisationsInfo, setOrganisationsInfo] = useState<any[]>([]);

    useEffect(() => {
        if (!userBooking) return;

        const organisationIds = [
            ...new Set(
                userBooking?.map((booking) => booking?.courses?.organisation) ||
                    []
            ),
        ];

        if (organisationIds.length === 0) return;

        const fetchOrganisations = async () => {
            try {
                const results = await Promise.all(
                    organisationIds.map(async (orgId) => {
                        const { data, isLoading, error } =
                            await useOrganisationById(orgId || '');
                        if (isLoading) return null;
                        if (error)
                            return {
                                orgId,
                                name: 'Erreur lors de la récupération',
                            };
                        return {
                            orgId,
                            name:
                                data?.organisationName ||
                                'Organisation inconnue',
                        };
                    })
                );
                setOrganisationsInfo(results.filter(Boolean));
            } catch (error) {
                log.error(
                    'Erreur lors de la récupération des organisations',
                    error
                );
            }
        };

        fetchOrganisations();
    }, [userBooking]);

    if (!data || !userBooking) {
        return [];
    }

    const organisationMap = useMemo(() => {
        if (!organisationsInfo || organisationsInfo.length === 0) {
            return {};
        }
        return Object.fromEntries(
            organisationsInfo.map((org) => [org?.orgId, org?.name])
        );
    }, [organisationsInfo]);

    // Fusion des réservations avec les noms des organisations
    const bookingsWithOrgNames = useMemo(() => {
        if (!userBooking || userBooking.length === 0 || !organisationMap) {
            return [];
        }

        return (userBooking || []).map((booking) => {
            // Vérification que `courses` et `organisation` existent dans chaque réservation
            const organisationId = booking?.courses?.organisation;
            const organisationName =
                organisationMap[organisationId] || 'Organisation inconnue';

            return {
                ...booking,
                organisationName,
            };
        });
    }, [userBooking, organisationMap]);
    return bookingsWithOrgNames;
};
