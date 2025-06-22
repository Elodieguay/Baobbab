import { useGetCategory, useGetCourseById } from '@/hooks/courses/query';
import { useParams } from 'react-router';
import CourseDetails from '@/components/courses/courseById/CourseDetails';
import CourseOrgDetails from '@/components/courses/courseById/CourseOrgDetails';
import { useTranslation } from 'react-i18next';
import HeaderCourse from '@/components/courses/courseById/HeaderCourse';

const CourseById = (): JSX.Element => {
    const { id } = useParams();

    const { data: category } = useGetCategory();

    const { data: coursesInfos, isLoading } = useGetCourseById(id ?? '');

    const { t } = useTranslation('common', { keyPrefix: 'Courses' });

    if (!id) {
        return <div>{t('page.courseById.dialog.noCourse')}</div>;
    }
    if (!category) {
        return <div>{t('page.courseById.dialog.noCategory')} </div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-neutral-50 items-center gap-5">
            <div className="flex flex-col w-full px-4 lg:px-0 py-8 lg:py-10 md:gap-14  max-md:container xxl:container justify-center items-center">
                <HeaderCourse coursesInfos={coursesInfos} />
                <div className="flex flex-col lg:flex-row gap-10  container justify-center">
                    <CourseOrgDetails />
                    <div className="lg:w-3/4 md:flex-start">
                        <CourseDetails courseData={coursesInfos} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseById;
