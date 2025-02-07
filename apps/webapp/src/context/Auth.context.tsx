import { UserRole } from '@baobbab/dtos';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserInformation = {
    email: string | null;
    username: string | null;
};
export type AuthContextType = {
    authToken?: string | undefined;
    role: UserRole | null;
    setAuthToken: (
        token: string,
        userRole: UserRole,
        userInfo: UserInformation
    ) => void;
    removeAuthToken: () => void;
    loading: boolean;
    infos: UserInformation | null;
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
    const [infos, setInfos] = useState<UserInformation | null>(
        sessionStorage.getItem('USER_INFO')
            ? JSON.parse(sessionStorage.getItem('USER_INFO')!)
            : undefined
    );
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = sessionStorage.getItem('JWT_AUTH');
        const storeRole = sessionStorage.getItem('ROLE');
        const userInfo = sessionStorage.getItem('USER_INFO');
        if (token) {
            setAuthToken(token);
            setRole(storeRole as UserRole);
            if (userInfo) {
                setInfos(JSON.parse(userInfo));
            }
        }
        setLoading(false);
    }, []);

    const setToken = (
        token: string,
        userRole: UserRole,
        userInfo: UserInformation
    ): void => {
        console.log('setToken', token, userRole, userInfo);

        sessionStorage.setItem('JWT_AUTH', token);
        sessionStorage.setItem('ROLE', userRole);
        sessionStorage.setItem('USER_INFO', JSON.stringify(userInfo));
        setAuthToken(token);
        setRole(userRole);
        setInfos(userInfo);
    };

    const removeToken = (): void => {
        console.log('removeToken');

        sessionStorage.removeItem('JWT_AUTH');
        sessionStorage.removeItem('ROLE');
        sessionStorage.removeItem('USER_INFO');
        setAuthToken(undefined);
        setRole(null);
        setInfos(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                role,
                setAuthToken: setToken,
                removeAuthToken: removeToken,
                loading,
                infos,
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
