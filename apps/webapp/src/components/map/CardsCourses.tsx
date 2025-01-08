import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import React from 'react';
import { coursesNantesProps } from '@/utils/coursesGeocoding';

export interface CardsCoursesProps {
    item: coursesNantesProps;
    setHoveredCardId: React.Dispatch<React.SetStateAction<number | null>>;
}
const CardsCourses = ({
    item,
    setHoveredCardId,
}: CardsCoursesProps): JSX.Element => {
    return (
        <Card
            key={item.id}
            className="w-full h-44 shadow-sm border rounded-md overflow-hidden flex border-none relative"
            onMouseEnter={() => setHoveredCardId(item.id)}
            onMouseLeave={() => setHoveredCardId(null)}
        >
            <div className="relative w-1/3 h-full ">
                <img
                    src={`https://fakeimg.pl/300x150?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-2  transition-transform transform hover:scale-110  "
                    onClick={() =>
                        console.log(`${item.name} ajouté aux favoris`)
                    }
                >
                    <Heart size={25} className="text-white" />
                </Button>
            </div>
            <div className="flex flex-col justify-around text-gray-600">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold ">
                        {item.name}
                    </CardTitle>
                    <CardDescription className="text-sm ">
                        Coordonnées : {item.lng}, {item.lat}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 text-sm">
                        Jours d'ouverture : Lundi - Vendredi
                    </p>
                </CardContent>
                {/* <div className="p-4">
                            <Button className=" text-sm px-4 py-2 rounded-md hover:bg-[#dfa438]">
                                Voir plus
                            </Button>

                        </div> */}
            </div>
        </Card>
    );
};

export default CardsCourses;
