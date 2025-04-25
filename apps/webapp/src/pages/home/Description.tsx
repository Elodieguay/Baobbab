import CardsContent from '@/components/home/CardsContent';
import { useTranslation } from 'react-i18next';

const Description = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Description',
    });
    return (
        <div className=" bg-home-bao flex md:flex-col w-full h-[80dvh] gap-16 justify-center items-center ">
            <h1 className="text-3xl">{t('title')} </h1>
            <div className="w-full flex justify-center items-center">
                <CardsContent />
            </div>
        </div>
    );
};

export default Description;
