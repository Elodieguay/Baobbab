import { Badge } from '@/components/ui/badge'; // Shadcn badge
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import elo from '@/assets/images/elo.png';
import { Instagram, Quote } from 'lucide-react';
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

const CourseById = (): JSX.Element => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authToken } = useAuth();
    const { data: category } = useGetCategory();
    const { data: coursesInfos, isLoading } = useGetCourseById(id ?? '');

    // const navigate = useNavigate();
    log.debug(category);

    if (!id) {
        return <div>Course not found</div>;
    }
    if (!category) {
        return <div>Category not found</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const team = {
        avatars: elo,
        details:
            'Lara se consacre à créer un espace inclusif où chacun, quel que soit son niveau ou son âge, peut explorer la danse comme un moyen d’expression et de bien-être. Entre cours, ateliers thématiques, et organisation de spectacles, elle met tout en œuvre pour faire vivre la culture de la danse et fédérer une communauté autour de cette passion commune.',
    };
    log.debug('catgeorycourse', category);

    // Fonction pour trouver le titre de la catégorie correspondant à l'id

    // const categoryTitle = () => {
    //     const categoryBadge = [category]?.find(
    //         (cat) => cat.id === coursesInfos?.category.id
    //     );
    //     return categoryBadge?.title;
    // };
    const getCategoryTitle = () => {
        const categories = Array.isArray(category) ? category : [category];

        return (
            categories.find((cat) => cat.id === coursesInfos?.category?.id)
                ?.title || null
        );
    };
    log.debug(getCategoryTitle());

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
                <div className=" w-1/3 flex flex-col items-center justify-center gap-20">
                    <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold text-center">
                        {coursesInfos?.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-base ">
                            {getCategoryTitle()}
                        </Badge>
                    </div>
                    <Dialog
                        open={isModalOpen}
                        onOpenChange={(open) => setIsModalOpen(open)}
                    >
                        <DialogTrigger asChild>
                            <div>
                                <Button
                                    variant="default"
                                    className={cn('bg-[#be3565]')}
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={!authToken}
                                >
                                    Réserver un cours d'essai
                                </Button>
                                {!authToken && (
                                    <p className="text-red-500 text-base">
                                        Vous devez vous inscrire pour réserver
                                        un cours d'essai.
                                    </p>
                                )}
                            </div>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col justify-center items-center font-normal p-10 rounded-2xl ">
                            <DialogHeader>
                                <DialogTitle>
                                    Réserver un cours d'essai
                                </DialogTitle>
                                <DialogDescription className="space-y-4 flex flex-col  justify-center items-center"></DialogDescription>
                            </DialogHeader>
                            <ModalBooking data={coursesInfos} />
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
            <div className="flex flex-col h-full container lg:py-10 justify-center">
                <div className="flex flex-col lg:flex-row  lg:gap-10 justify-center items-center">
                    <aside className="lg:w-1/4 flex flex-col flex-grow-0 gap-6 items-center bg-white shadow rounded-md border-green-700">
                        <div className="flex flex-col items-center px-4 space-y-6 ">
                            <h1 className="text-2xl font-semibold text-neutral-800 mt-2">
                                Focus sur la team
                            </h1>
                            <div className="h-44 w-44">
                                <img
                                    src={team.avatars}
                                    className="rounded-full object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="bg-[#ffcd00] px-4 flex text-justify ">
                            <p>
                                <Quote />
                                {team.details}
                            </p>
                        </div>
                    </aside>
                    <div className="lg:w-3/4 gap-28 space-y-6">
                        <CourseDetails courseData={coursesInfos} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseById;
