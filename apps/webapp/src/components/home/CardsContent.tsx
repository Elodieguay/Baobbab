import { useTranslation } from 'react-i18next';
import { Card, CardDescription } from '../ui/card';

const CardContent = () => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Description',
    });
    const cards = [
        t('card.firstCard'),
        t('card.secondCard'),
        t('card.thirdCard'),
    ];

    return (
        <div className="flex w-[95%] justify-between items-center gap-8">
            {cards.map((item, index) => (
                <Card
                    key={index}
                    className="w-2/3 h-[40dvh] rounded-3xl bg-[#cb8501] flex items-center"
                >
                    <CardDescription className="text-xl text-white font-semibold p-6">
                        {item}{' '}
                    </CardDescription>
                </Card>
            ))}
        </div>
    );
};

export default CardContent;
