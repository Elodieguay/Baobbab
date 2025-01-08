import './App.css';
import Router from './router/Router';
import { AuthProvider } from './context/Auth.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider, useModal } from './context/Modal.context';
import ModalAuth from './components/auth/ModalAuth';
import { CityProvider } from './context/City.context';

const AppContent = (): JSX.Element => {
    const { isModalOpen } = useModal();

    return (
        <>
            {isModalOpen && <ModalAuth />}
            <Router />
        </>
    );
};

function App(): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <CityProvider>
                        <AppContent />
                    </CityProvider>
                </ModalProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;
