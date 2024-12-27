import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserRole } from '../router/enumRoute';

export type AuthContextType = {
    authToken?: string | undefined;
    role: UserRole | null;
    setAuthToken: (token: string, userRole: UserRole) => void;
    removeAuthToken: () => void;
    loading: boolean;
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
    const [loading, setLoading] = useState<boolean>(true);
    console.log('je suis dans le authprovider', authToken, role);

    useEffect(() => {
        const token = sessionStorage.getItem('JWT_AUTH');
        const storeRole = sessionStorage.getItem('ROLE');
        if (token) {
            console.log('Token in session storage', token);
            console.log('Role in session storage', storeRole);

            setAuthToken(token);
            setRole(storeRole as UserRole);
        }
        setLoading(false);
    }, []);
    console.log('role du setter SetRole', role);

    const setToken = (token: string, userRole: UserRole): void => {
        console.log('setToken', token, userRole);

        sessionStorage.setItem('JWT_AUTH', token);
        sessionStorage.setItem('ROLE', userRole);
        setAuthToken(token);
        setRole(userRole);
    };

    const removeToken = (): void => {
        console.log('removeToken');

        sessionStorage.removeItem('JWT_AUTH');
        sessionStorage.removeItem('ROLE');
        setAuthToken(undefined);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                role,
                setAuthToken: setToken,
                removeAuthToken: removeToken,
                loading,
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
