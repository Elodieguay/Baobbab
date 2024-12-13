import React, { createContext, useContext, useState } from "react";
import { client } from "../apollo";
import { UserRole } from "../router/enumRoute";



export type AuthContextType = {
    authToken?: string | undefined,
    role: UserRole | null,
    setAuthToken: (token: string) => void
    removeAuthToken: () => void
}
// On Crée le contexte
const AuthContext = createContext<Partial<AuthContextType>>({})

// Fournisseur du contexte

export const AuthProvider = ({children}:React.ComponentProps<any>) => {
    
    const [authToken, setAuthToken] = useState<string | undefined>(localStorage.getItem('JWT_AUTH') || undefined);
    const [role, setRole] = useState<UserRole |null>(null);
    const setToken = (token: string) => {
        localStorage.setItem('JWT_AUTH', token);
        setAuthToken(token)
        setRole(role)
    }

    const removeToken = () => {
        localStorage.removeItem('JWT_AUTH');
        setAuthToken(undefined);
        setRole(null)
        client.cache.reset()
    }


  return (
    <AuthContext.Provider 
    value={{
        authToken, 
        setAuthToken: setToken, 
        removeAuthToken: removeToken
    }}>
        {children}
    </AuthContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useAuth= () => {
    return useContext(AuthContext);
  }
