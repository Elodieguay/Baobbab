import { useRefreshToken } from '@/hooks/auth/query';
import { isTokenExpired } from '@/utils/authHelpers';
import { UserRole } from '@baobbab/dtos';
import { useQueryClient } from '@tanstack/react-query';
import log from 'loglevel';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserInformation = {
    email: string | null;
    username: string | null;
};
export type AuthDataProps = {
    token: string;
    refreshToken?: string;
    role?: UserRole;
};
export type AuthContextType = {
    authData?: AuthDataProps;
    setAuthData: (token: string, refreshToken: string, role: UserRole) => void;
    removeAuthData: () => void;
    loading: boolean;
};
// We create the context
const AuthContext = createContext<Partial<AuthContextType>>({});

// Provider of the context
export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
    children,
}) => {
    const queryClient = useQueryClient();

    const [authData, setAuthDataState] = useState<AuthDataProps | undefined>(
        () => {
            const token = sessionStorage.getItem('JWT_AUTH') || undefined;
            const refreshToken =
                localStorage.getItem('REFRESH_TOKEN') || undefined;
            const role = sessionStorage.getItem('USER_ROLE') as
                | UserRole
                | undefined;

            if (token) {
                return { token, refreshToken, role };
            }
            return undefined;
        }
    );
    const { mutateAsync: tokenRefreshed } = useRefreshToken();
    const [loading, setLoading] = useState<boolean>(true);

    const handleRefreshToken = async (refreshTokenValue: string) => {
        const response = await tokenRefreshed(refreshTokenValue);
        if (response?.access_token) {
            setAuthData(
                response.access_token,
                refreshTokenValue,
                authData?.role
            );
            queryClient.invalidateQueries();
        } else {
            removeAuthData();
        }
    };
    useEffect(() => {
        const initAuth = async () => {
            if (authData?.token) {
                const expired = isTokenExpired(authData.token);
                if (expired && authData.refreshToken) {
                    await handleRefreshToken(authData.refreshToken);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    useEffect(() => {
        if (authData?.token) {
            const interval = setInterval(
                async () => {
                    const expired = isTokenExpired(authData.token);
                    if (expired && authData?.refreshToken) {
                        handleRefreshToken(authData?.refreshToken);
                    }
                },
                1 * 60 * 1000
            );
            return () => clearInterval(interval);
        } else {
            removeAuthData();
        }
    }, [authData]);

    const setAuthData = (
        token: string,
        refreshToken: string,
        role?: UserRole
    ): void => {
        sessionStorage.setItem('JWT_AUTH', token);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
        if (role) {
            sessionStorage.setItem('USER_ROLE', role);
        }
        setAuthDataState({ token, refreshToken, role });
    };

    const removeAuthData = (): void => {
        sessionStorage.clear();
        localStorage.removeItem('REFRESH_TOKEN');
        setAuthDataState(undefined);
    };
    log.debug('authdata', authData);
    return (
        <AuthContext.Provider
            value={{
                authData,
                loading,
                setAuthData,
                removeAuthData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): Partial<AuthContextType> => {
    return useContext(AuthContext);
};
