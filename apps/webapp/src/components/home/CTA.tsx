import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const CTA = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'CTA',
    });
    return (
        <div className=" h-[40dvh] flex rounded-[60px] justify-center ">
            <div className="w-[95%] xl:w-[77%] h-full flex flex-col justify-center items-center text-center p-14 gap-8 bg-[#be3565] rounded-[60px]">
                <div className="">
                    <h2 className="text-white md:text-2xl md:leading-10 font-semibold">
                        {t('title')}
                    </h2>
                </div>
                <Button className="text-white bg-[#01a274] text-lg p-7 rounded-2xl">
                    {t('button')}
                </Button>
            </div>
        </div>
    );
};

export default CTA;
