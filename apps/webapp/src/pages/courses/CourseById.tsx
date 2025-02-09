import { Separator } from '@/components/ui/separator'; // Shadcn separator
import { Badge } from '@/components/ui/badge'; // Shadcn badge
import { Button } from '@/components/ui/button';
import escalade from '@/assets/images/escalade.jpg';
import TableDashboard from '@/components/tables/TableDashboard';
import { courses } from '@/utils/utils';
import elo from '@/assets/images/elo.png';
import { Instagram, Quote } from 'lucide-react';
const CourseById = (): JSX.Element => {
    const team = {
        avatars: elo,
        details:
            'Lara se consacre à créer un espace inclusif où chacun, quel que soit son niveau ou son âge, peut explorer la danse comme un moyen d’expression et de bien-être. Entre cours, ateliers thématiques, et organisation de spectacles, elle met tout en œuvre pour faire vivre la culture de la danse et fédérer une communauté autour de cette passion commune.',
    };
    return (
        <div className="flex flex-col w-full h-full bg-neutral-50 items-center gap-5">
            <section className="flex w-full h-[30rem]">
                <figure className="w-2/3 h-full overflow-hidden rounded-r-md">
                    <img
                        src={escalade}
                        alt="Activity Image"
                        className="object-cover w-full h-full "
                    />
                </figure>
                <div className=" w-1/3 flex flex-col items-center justify-center gap-20">
                    <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold text-center">
                        Maedup : Nœuds coréens
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Art</Badge>
                        <Badge variant="outline">Culture</Badge>
                        <Badge variant="outline">DIY</Badge>
                    </div>
                    <Button
                        variant="default"
                        className="bg-[#01a274] text-white text-base"
                    >
                        Réserver un cours d'essai
                    </Button>
                </div>
            </section>
            <div className="flex h-full container p-6 lg:py-10 justify-center  ">
                <div className="flex flex-col lg:flex-row lg:gap-10  ">
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
                        {/* <h2 className="text-2xl font-semibold text-neutral-800">
                            Description
                        </h2> */}
                        <p className="text-lg text-[#45295a] leading-relaxed font-semibold">
                            Découvrez l'art des nœuds traditionnels coréens dans
                            un cadre convivial. Ce cours est idéal pour les
                            amateurs de DIY ou les curieux souhaitant apprendre
                            une technique ancestrale.
                        </p>
                        <Separator className="my-4" />
                        <h2 className="text-2xl font-semibold text-neutral-800">
                            Les cours proposés
                        </h2>
                        <TableDashboard courses={courses} />
                        <Separator className="my-4" />
                        <h2 className="text-2xl font-semibold text-neutral-800">
                            Contact & Réseaux Sociaux
                        </h2>
                        <ul>
                            <li>
                                {' '}
                                <Instagram />
                            </li>
                            <li></li>
                        </ul>
                        {/* <Button
                            variant="default"
                            className="bg-[#01a274] text-white"
                        >
                            Réserver maintenant
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseById;
