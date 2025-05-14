import { useTranslation } from 'react-i18next';

const Quotes = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Home',
    });
    return (
        <div className="flex justify-center mt-10 px-4">
            <div className="bg-[#01a274] w-full max-w-6xl rounded-2xl md:rounded-[60px] flex items-center px-6 py-10 md:px-10 md:py-14">
                <p className="text-white text-base md:text-2xl leading-relaxed md:leading-10 font-semibold text-center w-full">
                    {t('quote')}
                </p>
            </div>
        </div>
    );
};

export default Quotes;
