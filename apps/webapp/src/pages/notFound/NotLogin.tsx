import Navbar from '@/components/navbar/Navbar';
import { Router } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

const NotLogin = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'NotLogin',
    });
    return (
        <div className="relative w-full h-screen overflow-y-hidden">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100">
                <h2 className="max-w-xl ">{t('404')}</h2>
                <div className="flex">
                    <p className="bottom-0 text-[37rem] -rotate-[10deg] origin-right leading-none">
                        <Trans
                            i18nKey="NotFound.logo"
                            components={{
                                span: <span className="text-[#01a274]" />,
                            }}
                        />
                    </p>
                    <Router className="w-20 h-20" />
                </div>
            </div>
        </div>
    );
};

export default NotLogin;
