import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (): void => setIsModalOpen(true);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
