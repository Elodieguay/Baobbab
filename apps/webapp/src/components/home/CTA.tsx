import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const CTA = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'CTA',
    });
    return (
        <div className="flex justify-center px-4 py-10">
            <div className="w-full lg:w-[89%] xxl:w-3/4 flex flex-col justify-center items-center text-center gap-6 md:gap-8 bg-[#be3565] rounded-[30px] md:rounded-[60px] px-6 py-10 md:px-14 md:py-16 lg:py-24 xxl:py-32">
                <h2 className="text-white text-base md:text-xl xl:text-2xl leading-snug md:leading-10 font-semibold">
                    {t('title')}
                </h2>
                <Button className="text-white bg-[#01a274] text-base md:text-lg xl:text-2xl  px-6 py-3 md:px-8 md:py-4 xl:p-9 rounded-xl md:rounded-2xl">
                    {t('button')}
                </Button>
            </div>
        </div>
    );
};

export default CTA;
