import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router';

interface CityContextType {
    city: string | undefined;
    setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [city, setCity] = useState<string | undefined>(undefined);
    console.log('city de cityprovider', city);

    return (
        <CityContext.Provider value={{ city, setCity }}>
            {children}
        </CityContext.Provider>
    );
};

export const useCity = (): CityContextType => {
    const context = useContext(CityContext);
    if (!context) {
        throw new Error('useCity must be within a CityProvider');
    }
    return context;
};
