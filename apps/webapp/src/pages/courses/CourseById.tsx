import { useGetCourseById } from '@/hooks/courses/query';
import { useParams } from 'react-router';
import CourseDetails from '@/components/courses/courseById/CourseDetails';
import CourseOrgDetails from '@/components/courses/courseById/CourseOrgDetails';
import HeaderCourse from '@/components/courses/courseById/HeaderCourse';
import { useTranslation } from 'react-i18next';

const CourseById = (): JSX.Element => {
    const { id } = useParams();
    const { data: coursesInfos, isLoading } = useGetCourseById(id ?? '');
    const { t } = useTranslation('common', { keyPrefix: 'Courses' });

    if (!id) {
        return <div>{t('page.courseById.dialog.noCourse')}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full h-full bg-neutral-50 items-center gap-5">
            <HeaderCourse coursesInfos={coursesInfos} />
            <div className="flex flex-col h-full container lg:py-10 lg:flex-row  lg:gap-10 lg:justify-around">
                <CourseOrgDetails course={coursesInfos} />
                <CourseDetails courseData={coursesInfos} />
            </div>
        </div>
    );
};

export default CourseById;
