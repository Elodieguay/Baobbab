import { Heart } from 'lucide-react';
import React from 'react';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import log from 'loglevel';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

    return (
        <Card
            key={item.id}
            className="w-full h-auto md:h-64 shadow-md border rounded-md overflow-hidden flex flex-col md:flex-row border-none relative"
            onMouseEnter={() => setHoveredCardId(item.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            data-testid="course-card"
        >
            <div className="relative w-full md:w-1/3 h-48 md:h-full">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    width={400}
                    height={300}
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?_gl=1*ikdshm*_ga*MzQyNDM4NTk2LjE3NTEzNzY3NjI.*_ga_8JE65Q40S6*czE3NTEzNzY3NjEkbzEkZzAkdDE3NTEzNzY3NjEkajYwJGwwJGgw&w=800&q=75&fm=webp';
                    }}
                />
                <Button
                    aria-label="Ajouter aux favoris"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-2 transition-transform transform hover:scale-110"
                    onClick={() => log.info(`${item.title} ajouté aux favoris`)}
                >
                    <Heart size={25} className="text-white" />
                </Button>
            </div>
            <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
                <CardHeader className="gap-2 md:gap-4">
                    <CardTitle className="text-lg font-semibold">
                        {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        {item.description.length > 150
                            ? `${item.description.slice(0, 50)}...`
                            : item.description}
                        <p className="text-gray-600 text-sm mt-2">
                            <strong>Durée :</strong> {item.duration} minutes
                        </p>
                    </CardDescription>
                </CardHeader>
                <div className="mt-4">
                    <Button
                        aria-label="Voir plus de détails"
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
