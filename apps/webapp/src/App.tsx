import './App.css';
import Router from './router/Router';
import { AuthProvider } from './context/Auth.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider, useModal } from './context/Modal.context';
import ModalAuth from './components/auth/ModalAuth';
import { CityProvider } from './context/City.context';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { configureLogs } from '@/utils/logConfig/logCongif';
import '@/utils/logConfig/sentryConfig';
import { Toaster } from './components/ui/toaster';

configureLogs();

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
        <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ModalProvider>
                        <CityProvider>
                            <div className="flex flex-col min-h-screen">
                                <AppContent />
                            </div>
                        </CityProvider>
                    </ModalProvider>
                    <Toaster />
                    <ReactQueryDevtools initialIsOpen={false} />
                </AuthProvider>
            </QueryClientProvider>
        </I18nextProvider>
    );
}

export default App;
