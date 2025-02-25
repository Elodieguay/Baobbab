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
        <div className="flex w-3/4 justify-between items-center gap-10">
            {cards.map((item, index) => (
                <Card
                    key={index}
                    className="w-1/2 h-64 rounded-3xl bg-[#cb8501] flex items-center"
                >
                    <CardDescription className="text-base text-white font-semibold p-6">
                        {item}{' '}
                    </CardDescription>
                </Card>
            ))}
        </div>
    );
};

export default CardContent;
