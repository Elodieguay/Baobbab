import Maplibre from '@/components/map/Maplibre';
import { coursesNantes } from '@/utils/coursesGeocoding';
import { getCoordinates } from '@/api/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CardsCourses from '@/components/map/CardsCourses';
import { useCity } from '@/context/City.context';

const CourseByCity = (): JSX.Element | null => {
    // const { city } = useParams<{ city: string }>();

    const { city } = useCity();
    if (!city) {
        return null;
    }
    // console.log('city', city);
    // console.log('coucou');

    const {
        data: coordinates,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['coordinates', city],
        queryFn: () => getCoordinates(city),
        enabled: !!city,
    });

    // console.log('coordinates dans coursebycity', coordinates);

    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

    return (
        <div className="flex w-full h-full mt-4 fixed ">
            <div className="w-1/2 grid grid-cols items-center justify-center px-9 gap-4 overflow-y-scroll scrollbar-none ">
                {coursesNantes.map((item) => (
                    <CardsCourses
                        item={item}
                        setHoveredCardId={setHoveredCardId}
                    />
                ))}
            </div>
            <div className="w-1/2 sticky ">
                <Maplibre
                    loadCoordinates={coordinates ?? null}
                    isLoading={isLoading}
                    error={error}
                    data={coursesNantes}
                    hoveredCardId={hoveredCardId}
                />
            </div>
        </div>
    );
};

export default CourseByCity;
