import Navbar from '@/components/navbar/Navbar';
import { Trans, useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'NotFound',
    });
    return (
        <div className="relative w-full h-screen overflow-y-hidden">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100">
                <h2 className="max-w-xl ">{t('404')}</h2>
                <p className="bottom-0 text-[38rem] -rotate-[10deg] origin-right leading-none">
                    <Trans
                        i18nKey="NotFound.logo"
                        components={{
                            span: <span className="text-[#01a274]" />,
                        }}
                    />
                </p>
            </div>
        </div>
    );
};

export default NotFound;
