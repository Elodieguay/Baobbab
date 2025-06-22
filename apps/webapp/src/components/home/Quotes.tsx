import { useTranslation } from 'react-i18next';

const Quotes = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Home',
    });
    return (
        <div className="flex justify-center mt-10 px-4 w-full">
            <div className="bg-[#01a274] w-full lg:w-[89%] xxl:w-3/4  rounded-2xl md:rounded-[60px] flex items-center px-6 py-10 md:px-15 md:py-14 lg:py-24 xxl:py-32">
                <p className="text-white text-base md:text-xl xl:text-2xl leading-relaxed md:leading-10 font-semibold text-center w-full md:px-8 xl:px-16">
                    {t('quote')}
                </p>
            </div>
        </div>
    );
};

export default Quotes;
