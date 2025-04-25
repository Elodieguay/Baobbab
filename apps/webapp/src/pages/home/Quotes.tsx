import { useTranslation } from 'react-i18next';

const Quotes = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Home',
    });
    return (
        <div className="flex  justify-center mt-10">
            <div className="bg-[#01a274] w-[95%] xl:w-[77%] h-[45dvh] rounded-[60px] items-center flex">
                <p className="text-white text-center md:text-2xl md:leading-10 font-semibold p-8">
                    {t('quote')}
                </p>
            </div>
        </div>
    );
};

export default Quotes;
