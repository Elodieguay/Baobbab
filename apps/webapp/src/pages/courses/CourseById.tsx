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
        <div className="flex flex-col w-full h-full bg-neutral-50 items-center gap-5">
            <section className="flex w-full h-[30rem]">
                <figure className="w-2/3 h-full overflow-hidden rounded-r-md">
                    <img
                        src={coursesInfos?.image}
                        alt="Activity Image"
                        className="object-cover w-full h-full "
                    />
                </figure>
                <div className=" w-1/3 flex flex-col items-center justify-center gap-14">
                    <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold text-center">
                        {coursesInfos?.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-base ">
                            {getCategoryTitle()}
                        </Badge>
                    </div>
                    <div className="flex justify-center items-center">
                        <Dialog
                            open={isModalOpen}
                            onOpenChange={(open) => setIsModalOpen(open)}
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
                                        <p className="text-red-500 text-sm w-2/3 text-center">
                                            {t('page.courseById.auth.button')}
                                        </p>
                                    )}
                                </div>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col justify-center items-center font-normal p-10 rounded-2xl ">
                                <DialogHeader>
                                    <DialogTitle>
                                        {t('page.courseById.dialog.title')}
                                    </DialogTitle>
                                    <DialogDescription className="space-y-4 flex flex-col  justify-center items-center"></DialogDescription>
                                </DialogHeader>
                                <ModalBooking courseData={coursesInfos} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>
            <div className="flex flex-col h-full container lg:py-10 justify-center">
                <div className="flex flex-col lg:flex-row  lg:gap-10 justify-center ">
                    <CourseOrgDetails course={coursesInfos} />
                    <div className="lg:w-3/4 ">
                        <CourseDetails courseData={coursesInfos} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseById;
