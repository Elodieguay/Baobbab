import { Card, CardHeader, CardTitle } from '../ui/card';

export interface PinCardsProps {
    // item:coursesNantesProps,
    item: React.Dispatch<React.SetStateAction<number | null>>;
}
const PinCards = (): JSX.Element => {
    return (
        <Card
            className="w-1/5 h-44 shadow-sm border rounded-md overflow-hidden flex border-none relative"
            // onMouseEnter={() => setHoveredCardId(item.id)}
            // onMouseLeave={() => setHoveredCardId(null)}
        >
            <div className="relative w-1/3 h-full ">
                <img
                    src={`https://fakeimg.pl/300x150?`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-around text-gray-600">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold ">
                        test blabla
                    </CardTitle>
                </CardHeader>
            </div>
        </Card>
    );
};

export default PinCards;
