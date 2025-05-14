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
        <div className="flex flex-col md:flex-row flex-wrap w-full max-w-6xl justify-center items-stretch gap-8">
            {cards.map((item, index) => (
                <Card
                    key={index}
                    className="w-full md:w-[30%] h-auto min-h-[200px] rounded-3xl bg-[#cb8501] flex items-center"
                >
                    <CardDescription className="text-base md:text-lg text-white font-semibold p-6 text-center">
                        {item}
                    </CardDescription>
                </Card>
            ))}
        </div>
    );
};

export default CardContent;
