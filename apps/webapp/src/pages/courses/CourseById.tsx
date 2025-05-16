import { Badge } from '@/components/ui/badge'; // Shadcn badge
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import { useGetCategory, useGetCourseById } from '@/hooks/courses/query';
import { useParams } from 'react-router';
import ModalBooking from '@/components/booking/ModalBooking';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import CourseDetails from '@/components/courses/courseById/CourseDetails';
import log from 'loglevel';
import CourseOrgDetails from '@/components/courses/courseById/CourseOrgDetails';
import { useTranslation } from 'react-i18next';
import HeaderCourse from '@/components/courses/courseById/HeaderCourse';

const CourseById = (): JSX.Element => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authToken } = useAuth();

    const { data: category } = useGetCategory();

    const { data: coursesInfos, isLoading } = useGetCourseById(id ?? '');

    const { t } = useTranslation('common', { keyPrefix: 'Courses' });

    log.debug('course info courseId', coursesInfos);

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
            <HeaderCourse coursesInfos={coursesInfos} />

            <div className="flex flex-col w-full px-4 lg:px-0 container py-8 lg:py-10">
                <HeaderCourse coursesInfos={coursesInfos} />
                <div className="flex flex-col lg:flex-row gap-10 justify-center">
                    <CourseOrgDetails course={coursesInfos} />
                    <div className="lg:w-3/4">
                        <CourseDetails courseData={coursesInfos} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseById;
