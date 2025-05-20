import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import log from 'loglevel';

export interface PinCardsProps {
    cardId?: string | number;
    data: CoursesDTOGeojson[];
}
const PinCards = ({ cardId, data }: PinCardsProps): JSX.Element => {
    log.debug('cardId de PiinCard', cardId);
    log.debug('data in PinCards', data);
    const PinCardData = data.find((item) => item.id === cardId) ?? null;
    const result = PinCardData
        ? {
              title: PinCardData.title,
              image: PinCardData.image,
              address: PinCardData.address,
          }
        : null;

    return (
        <Card className="w-full h-32 bg-slate-200 shadow-sm rounded-xl flex flex-col justify-center items-center ">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center  ">
                    {result?.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-base text-center flex flex-col">
                <p>{result?.address}</p>
            </CardContent>
        </Card>
    );
};

export default PinCards;
