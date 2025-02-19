import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import React from 'react';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import log from 'loglevel';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export interface CardsCoursesProps {
    item: CoursesDTOGeojson;
    setHoveredCardId: React.Dispatch<React.SetStateAction<string | null>>;
    city: string;
}
const CardsCourses = ({
    item,
    setHoveredCardId,
    city,
}: CardsCoursesProps): JSX.Element => {
    log.debug('id of card in CardsCourses:', item.id);
    const { t } = useTranslation('common', {
        keyPrefix: 'Courses.cardsCourses',
    });
    const navigate = useNavigate();
    return (
        <Card
            key={item.id}
            className="w-full h-64 shadow-sm border rounded-md overflow-hidden flex border-none relative"
            onMouseEnter={() => setHoveredCardId(item.id)}
            onMouseLeave={() => setHoveredCardId(null)}
        >
            <div className="relative w-1/3 h-full">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-2 transition-transform transform hover:scale-110"
                    onClick={() =>
                        console.log(`${item.title} ajouté aux favoris`)
                    }
                >
                    <Heart size={25} className="text-white" />
                </Button>
            </div>
            <div className="flex flex-col justify-between p-4 w-2/3">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        {item.description.length > 100
                            ? `${item.description.slice(0, 100)}...`
                            : item.description}
                    </CardDescription>
                </CardHeader>
                <div className="flex flex-col mt-2">
                    <p className="text-gray-600 text-sm">
                        <strong>Durée :</strong> {item.duration} minutes
                    </p>
                    <p className="text-gray-600 text-sm">
                        <strong>Jours :</strong> {item.days.join(', ')}
                    </p>
                </div>
                <div className="mt-2">
                    <Button
                        className="text-sm px-4 py-2 rounded-md hover:bg-[#dfa438]"
                        onClick={() => navigate(`/courses/${city}/${item.id}`)}
                    >
                        {t('button')}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default CardsCourses;
