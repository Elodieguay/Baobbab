import Maplibre from '@/components/map/Maplibre';
import { getCoordinates } from '@/api/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import CardsCourses from '@/components/map/CardsCourses';
import { useCity } from '@/context/City.context';
import { useGetCourses } from '@/hooks/useGetCourses';
import log from 'loglevel';
import { CoursesDTOGeojson } from '@baobbab/dtos';

const CourseByCity = (): JSX.Element | null => {
    log.debug('composant rendu');
    const { city = '' } = useCity();

    const {
        data: coordinates,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['coordinates', city],
        queryFn: () => getCoordinates(city ?? null),
        enabled: !!city,
    });

    const {
        data: coursesNantes,
        isLoading: isLoadingCourses,
        error: errorCourses,
    } = useGetCourses(coordinates);
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
    const courses = useMemo(
        () => (coursesNantes as CoursesDTOGeojson) ?? [],
        [coursesNantes]
    );

    log.info('coursestitre ici:', courses);

    if (!city) {
        return null;
    }
    if (!Array.isArray(courses)) {
        return null;
    }

    if (isLoadingCourses) {
        return <p>Chargement des cours...</p>;
    }

    if (errorCourses) {
        return <p>Erreur lors du chargement des cours.</p>;
    }

    return (
        <div className="flex w-full h-screen mt-4  ">
            <div className="w-1/2 h-full overflow-y-auto px-9 ">
                <div className="grid grid-cols-1 gap-4">
                    {courses.map((item) => (
                        <CardsCourses
                            city={city}
                            key={item.id}
                            item={item}
                            setHoveredCardId={setHoveredCardId}
                        />
                    ))}
                </div>
            </div>
            <div className="w-1/2 sticky h-screen top-0 overflow-hidden">
                <Maplibre
                    loadCoordinates={coordinates ?? null}
                    isLoading={isLoading}
                    error={error}
                    courseData={courses}
                    hoveredCardId={hoveredCardId}
                />
            </div>
        </div>
    );
};

export default CourseByCity;
