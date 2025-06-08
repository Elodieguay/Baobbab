import { useRefreshToken } from '@/hooks/auth/query';
import { isTokenExpired } from '@/utils/authHelpers';
import { UserRole } from '@baobbab/dtos';
import log from 'loglevel';
import React, { createContext, useContext, useEffect, useState } from 'react';

type EntityType = 'user' | 'organisation';

export type UserInformation = {
    email: string | null;
    username: string | null;
};
export type AuthContextType = {
    authToken?: string | undefined;
    role: UserRole | null;
    entityType: EntityType | null;
    entityId: string | null;
    username: string | null;
    organisationName: string | null;
    email: string | null;
    setAuthToken: (token: string, userRole: UserRole) => void;
    removeAuthToken: () => void;
    loading: boolean;
    setAuthData: (
        token: string,
        refreshToken: string,
        userRole: UserRole,
        entityType: EntityType,
        entityId: string,
        username?: string,
        organizationName?: string,
        email?: string
    ) => void;
    removeAuthData: () => void;
};
// We create the context
const AuthContext = createContext<Partial<AuthContextType>>({});

// Provider of the context
export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
    children,
}) => {
    const [authToken, setAuthToken] = useState<string | undefined>(
        sessionStorage.getItem('JWT_AUTH') || undefined
    );
    const { mutateAsync: tokenRefreshed } = useRefreshToken();

    const [role, setRole] = useState<UserRole | null>(
        (sessionStorage.getItem('ROLE') as UserRole) || null
    );
    const [entityType, setEntityType] = useState<EntityType | null>(
        (sessionStorage.getItem('ENTITY_TYPE') as EntityType) || null
    );
    const [entityId, setEntityId] = useState<string | null>(
        sessionStorage.getItem('ENTITY_ID') || null
    );
    const [username, setUsername] = useState<string | null>(
        sessionStorage.getItem('USERNAME') || null
    );
    const [organisationName, setOrganisationName] = useState<string | null>(
        sessionStorage.getItem('ORG_NAME') || null
    );
    const [email, setEmail] = useState<string | null>(
        sessionStorage.getItem('EMAIL') || null
    );
    const [loading, setLoading] = useState<boolean>(true);

    const handleRefreshToken = async (
        refreshTokenValue: string
    ): Promise<{ access_token: string }> => {
        log.debug('Refreshing token with value:', refreshTokenValue);
        try {
            const response = await tokenRefreshed(refreshTokenValue);
            log.debug('Token refreshed successfully:', response);
            return response;
        } catch (error) {
            log.error('Error refreshing token:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (authToken) {
            const refreshTokenValue = localStorage.getItem('REFRESH_TOKEN');
            log.debug('refreshTokenValue:', refreshTokenValue);

            const interval = setInterval(
                async () => {
                    const expired = isTokenExpired(authToken);
                    log.debug('Is token expired?', expired);
                    if (expired) {
                        log.debug('Inside interval tick...');
                        handleRefreshToken(refreshTokenValue || '');
                    } else {
                        log.debug('Token is not expired, no need to refresh.');
                    }
                },
                1 * 60 * 1000
            );

            return () => clearInterval(interval);
        } else {
            removeAuthData();
        }
    }, [authToken]);

    const setAuthData = (
        token: string,
        refreshToken: string,
        userRole: UserRole,
        entityType: EntityType,
        entityId: string,
        username?: string,
        organisationName?: string,
        email?: string
    ): void => {
        log.debug('Saving tokens:', { token, refreshToken });

        sessionStorage.setItem('JWT_AUTH', token);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
        sessionStorage.setItem('ROLE', userRole);
        sessionStorage.setItem('ENTITY_TYPE', entityType);
        sessionStorage.setItem('ENTITY_ID', entityId);
        if (username) sessionStorage.setItem('USERNAME', username);
        if (organisationName)
            sessionStorage.setItem('ORG_NAME', organisationName);
        if (email) sessionStorage.setItem('EMAIL', email);

        setAuthToken(token);
        setRole(userRole);
        setEntityType(entityType);
        setEntityId(entityId);
        setUsername(username || null);
        setOrganisationName(organisationName || null);
        setEmail(email || null);
    };

    const removeAuthData = (): void => {
        sessionStorage.clear();
        setAuthToken(undefined);
        setRole(null);
        setEntityType(null);
        setEntityId(null);
        setUsername(null);
        setOrganisationName(null);
        setEmail(null);
    };
    log.info('AuthContext initialized with authToken:', authToken);
    return (
        <AuthContext.Provider
            value={{
                authToken,
                role,
                entityType,
                entityId,
                username,
                organisationName,
                email,
                loading,
                setAuthData,
                removeAuthData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = (): Partial<AuthContextType> => {
    return useContext(AuthContext);
};
