import Maplibre from '@/components/courses/Maplibre';
import { getCoordinates } from '@/api/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import CardsCourses from '@/components/courses/CardsCourses';
// import { useCity } from '@/context/City.context';
import { useGetCategory, useGetCourseByCategory } from '@/hooks/courses/query';
import { CategoryDTO, CoursesDTOGeojson, Point } from '@baobbab/dtos';
import NavbarMenu from '@/components/navbar.tsx/NavbarMenu';
import NavbarCitySelection from '@/components/navbar.tsx/NavbarCitySelection';
import { useParams } from 'react-router';
import CourseSkeleton from '@/components/courses/CourseSkeleton';

const CourseByCity = (): JSX.Element | null => {
    const { city } = useParams<{ city: string }>();
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >('');
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
    const [categoryList, setCategoryList] = useState<CategoryDTO[]>([]);
    const {
        data: coordinates,
        isLoading,
        error,
    } = useQuery<Point>({
        queryKey: ['coordinates', city],
        queryFn: () => getCoordinates(city),
        enabled: !!city,
    });

    const {
        data: coursesNantes,
        isLoading: isLoadingCourses,
        error: errorCourses,
    } = useGetCourseByCategory(selectedCategory ?? '');
    const courses = useMemo(
        () => (coursesNantes as CoursesDTOGeojson) ?? [],
        [coursesNantes]
    );

    const { data: category } = useGetCategory();

    useEffect(() => {
        if (!category) {
            setSelectedCategory(undefined);
        }
        if (category && Array.isArray(category)) {
            setCategoryList(category);
        }
    }, [category]);

    if (!coordinates) {
        return null;
    }
    if (!city) {
        return null;
    }
    if (!Array.isArray(courses)) {
        return null;
    }

    if (isLoadingCourses) {
        return <CourseSkeleton />;
    }

    if (errorCourses) {
        return <p>Erreur lors du chargement des cours.</p>;
    }

    return (
        <div className=" w-full min-h-screen flex flex-col  gap-6 ">
            <div className="w-full h-full flex flex-col  items-center justify-center ">
                <div className="w-1/3 flex justify-center items-center  ">
                    <NavbarCitySelection />
                </div>
                <div className="h-14 w-full flex justify-center items-center object-center content-center border-b">
                    <NavbarMenu
                        setSelectedCategory={setSelectedCategory}
                        categoryList={categoryList}
                    />
                </div>
            </div>
            <div className="flex ">
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
                        loadCoordinates={coordinates}
                        isLoading={isLoading}
                        error={error}
                        courseData={courses}
                        hoveredCardId={hoveredCardId}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseByCity;
