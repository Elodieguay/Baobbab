import { useRefreshToken } from '@/hooks/auth/query';
import { isTokenExpired } from '@/utils/authHelpers';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserInformation = {
    email: string | null;
    username: string | null;
};
export type AuthContextType = {
    authToken?: string | undefined;
    setAuthToken: (token: string) => void;
    removeAuthToken: () => void;
    loading: boolean;
    setAuthData: (token: string, refreshToken: string) => void;
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
    const [loading] = useState<boolean>(true);

    const handleRefreshToken = async (
        refreshTokenValue: string
    ): Promise<{ access_token: string }> => {
        const response = await tokenRefreshed(refreshTokenValue);
        return response;
    };

    useEffect(() => {
        if (authToken) {
            const refreshTokenValue = localStorage.getItem('REFRESH_TOKEN');

            const interval = setInterval(
                async () => {
                    const expired = isTokenExpired(authToken);
                    if (expired) {
                        handleRefreshToken(refreshTokenValue || '');
                    }
                },
                1 * 60 * 1000
            );

            return () => clearInterval(interval);
        } else {
            removeAuthData();
        }
    }, [authToken]);

    const setAuthData = (token: string, refreshToken: string): void => {
        sessionStorage.setItem('JWT_AUTH', token);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);

        setAuthToken(token);
    };

    const removeAuthData = (): void => {
        sessionStorage.clear();
        setAuthToken(undefined);
    };
    return (
        <AuthContext.Provider
            value={{
                authToken,
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
