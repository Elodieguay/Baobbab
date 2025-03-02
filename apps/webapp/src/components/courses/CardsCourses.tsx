import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import React from 'react';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import log from 'loglevel';

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
    const { t } = useTranslation('common', {
        keyPrefix: 'Courses.cardsCourses',
    });
    const navigate = useNavigate();
    log.debug('schedule', item.schedule);

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
                    onClick={() => log.info(`${item.title} ajouté aux favoris`)}
                >
                    <Heart size={25} className="text-white" />
                </Button>
            </div>
            <div className="flex flex-col justify-between p-4 w-2/3 ">
                <CardHeader className="gap-4">
                    <CardTitle className="text-lg font-semibold">
                        {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 ">
                        {item.description.length > 150
                            ? `${item.description.slice(0, 50)}...`
                            : item.description}
                        <p className="text-gray-600 text-sm mt-2">
                            <strong>Durée :</strong> {item.duration} minutes
                        </p>
                    </CardDescription>
                </CardHeader>
                <div className="flex flex-col mt-2">
                    {/* <p className="text-gray-600 text-base">
                        <ul>
                            {item.schedule &&
                                item.schedule.map((data) => (
                                    <li>
                                        {data.day} à {data.hours}
                                    </li>
                                ))}
                        </ul>
                    </p> */}
                </div>
                <div className="mt-2 p-2">
                    <Button
                        className="text-sm px-4 py-2 rounded-xl hover:bg-[#dfa438]"
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
