import ModalBooking from '@/components/booking/ModalBooking';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/Auth.context';
import { useGetCategory } from '@/hooks/courses/query';
import { getCategoryTitle } from '@/utils/getCategoryTitle';
import { cn } from '@/utils/utils';
import { CoursesDTOGeojson, UserRole } from '@baobbab/dtos';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface HeaderCourseProps {
    coursesInfos: CoursesDTOGeojson | undefined;
}

const HeaderCourse = ({ coursesInfos }: HeaderCourseProps) => {
    const { data: category } = useGetCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authToken, role } = useAuth();
    const { t } = useTranslation('common', { keyPrefix: 'Courses' });
    const categoryTitle = coursesInfos
        ? getCategoryTitle({ category, coursesInfos })
        : '';

    const showMessage = () => {
        return (
            <p className="text-red-500 text-sm w-3/4 text-center">
                {t('page.courseById.auth.button')}
            </p>
        );
    };
    return (
        <section className="flex flex-col lg:flex-row w-full min-h-[30rem]">
            <figure className="w-full lg:w-2/3 h-64 lg:h-auto overflow-hidden rounded-b-md lg:rounded-r-md lg:rounded-b-none ">
                <img
                    src={
                        coursesInfos?.image !== ''
                            ? coursesInfos?.image
                            : 'https://www.pexels.com/fr-fr/photo/deux-emoji-jaunes-sur-etui-jaune-207983&w=800&q=75&fm=webp/'
                    }
                    alt="Activity Image"
                    className="object-cover w-full h-full"
                    loading="eager"
                    fetchPriority="high"
                />
            </figure>
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-10 px-4 py-6">
                <h1 className="text-gray-800 text-xl sm:text-3xl lg:text-5xl font-bold text-center">
                    {coursesInfos?.title}
                </h1>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm sm:text-base">
                        {categoryTitle}
                    </Badge>
                </div>

                <div className="flex justify-center items-center">
                    {authToken && role === UserRole.USER ? (
                        <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <DialogTrigger asChild>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <Button
                                        aria-label="Réserver un cours"
                                        variant="default"
                                        className={cn('bg-buttonPink')}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        {t('page.courseById.button')}
                                    </Button>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col justify-center items-center font-normal p-6 sm:p-10 rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        {t('page.courseById.dialog.title')}
                                    </DialogTitle>
                                </DialogHeader>
                                <ModalBooking
                                    courseData={coursesInfos}
                                    setIsModalOpen={setIsModalOpen}
                                />
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-2">
                            <Button
                                variant="default"
                                className={cn('bg-[#be3565]')}
                                onClick={() => showMessage()}
                            >
                                {t('page.courseById.button')}
                            </Button>
                            {showMessage()}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeaderCourse;
