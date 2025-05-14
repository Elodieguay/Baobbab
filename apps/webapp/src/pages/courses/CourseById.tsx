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
import CourseDetails from '@/components/courses/CourseDetails';
import log from 'loglevel';
import CourseOrgDetails from '@/components/courses/courseByCity/CourseOrgDetails';
import { useTranslation } from 'react-i18next';

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

    const getCategoryTitle = () => {
        const categories = Array.isArray(category) ? category : [category];

        return (
            categories.find((cat) => cat.id === coursesInfos?.category?.id)
                ?.title || null
        );
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-neutral-50 items-center gap-5">
            <section className="flex flex-col lg:flex-row w-full min-h-[30rem]">
                <figure className="w-full lg:w-2/3 h-64 lg:h-auto overflow-hidden rounded-b-md lg:rounded-r-md lg:rounded-b-none">
                    <img
                        src={coursesInfos?.image}
                        alt="Activity Image"
                        className="object-cover w-full h-full"
                    />
                </figure>
                <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-10 px-4 py-6">
                    <h1 className="text-gray-800 text-xl sm:text-3xl lg:text-5xl font-bold text-center">
                        {coursesInfos?.title}
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="text-sm sm:text-base"
                        >
                            {getCategoryTitle()}
                        </Badge>
                    </div>

                    <div className="flex justify-center items-center">
                        <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <DialogTrigger asChild>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <Button
                                        variant="default"
                                        className={cn('bg-[#be3565]')}
                                        onClick={() => setIsModalOpen(true)}
                                        disabled={!authToken}
                                    >
                                        {t('page.courseById.button')}
                                    </Button>
                                    {!authToken && (
                                        <p className="text-red-500 text-sm w-3/4 text-center">
                                            {t('page.courseById.auth.button')}
                                        </p>
                                    )}
                                </div>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col justify-center items-center font-normal p-6 sm:p-10 rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        {t('page.courseById.dialog.title')}
                                    </DialogTitle>
                                </DialogHeader>
                                <ModalBooking courseData={coursesInfos} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>

            <div className="flex flex-col w-full px-4 lg:px-0 container py-8 lg:py-10">
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
