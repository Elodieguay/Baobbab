import { UserRole } from '@baobbab/dtos';
import React, { createContext, useContext, useEffect, useState } from 'react';

type EntityType = 'user' | 'organisation';

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
        userRole: UserRole,
        entityType: EntityType,
        entityId: string,
        username?: string,
        organizationName?: string,
        email?: string
    ) => void;
    removeAuthData: () => void;
};
// On Crée le contexte
const AuthContext = createContext<Partial<AuthContextType>>({});

// Fournisseur du contexte
export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
    children,
}) => {
    const [authToken, setAuthToken] = useState<string | undefined>(
        sessionStorage.getItem('JWT_AUTH') || undefined
    );
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

    useEffect(() => {
        setLoading(false);
    }, []);
    // Mise à jour des données d'authentification

    const setAuthData = (
        token: string,
        userRole: UserRole,
        entityType: EntityType,
        entityId: string,
        username?: string,
        organisationName?: string,
        email?: string
    ): void => {
        sessionStorage.setItem('JWT_AUTH', token);
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
    // Suppression des données d'authentification

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
