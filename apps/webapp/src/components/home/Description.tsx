import CardsContent from '@/components/home/CardsContent';
import { useTranslation } from 'react-i18next';

const Description = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Description',
    });
    return (
        <div className="bg-home-bao flex flex-col w-full py-16 px-4 md:px-8 gap-12 justify-center items-center">
            <h1 className="text-2xl md:text-3xl text-center">{t('title')}</h1>
            <div className="w-full flex justify-center">
                <CardsContent />
            </div>
        </div>
    );
};

export default Description;
