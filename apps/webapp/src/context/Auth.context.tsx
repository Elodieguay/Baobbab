import React, { createContext, useContext, useState } from "react";
import { UserRole } from "../router/enumRoute";



export type AuthContextType = {
    authToken?: string | undefined,
    role: UserRole | null,
    setAuthToken: (token: string, userRole: UserRole) => void
    removeAuthToken: () => void
}
// On Crée le contexte
const AuthContext = createContext<Partial<AuthContextType>>({})

// Fournisseur du contexte

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    
    const [authToken, setAuthToken] = useState<string | undefined>(localStorage.getItem('JWT_AUTH') || undefined);
    const [role, setRole] = useState<UserRole |null>(null);
    
    const setToken = (token: string, userRole:UserRole) => {
        localStorage.setItem('JWT_AUTH', token);
        setAuthToken(token)
        setRole(userRole)
    }

    const removeToken = () => {
        localStorage.removeItem('JWT_AUTH');
        setAuthToken(undefined);
        setRole(null)
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
