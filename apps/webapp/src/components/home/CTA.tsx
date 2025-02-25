import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const CTA = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'CTA',
    });
    return (
        <div className=" w-full h-full flex-grow flex justify-center bg-[#be3565]">
            <div className="w-3/4 h-full flex justify-between items-center ">
                <div className="w-1/2 ">
                    <h2 className="text-white">{t('title')}</h2>
                </div>
                <Button className="text-white bg-[#01a274] text-lg p-7 rounded-2xl">
                    {t('button')}
                </Button>
            </div>
        </div>
    );
};

export default CTA;
