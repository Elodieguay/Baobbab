import { Button } from '@/components/ui/button';
import danseHomebis from '@/assets/images/danseHomebis.jpg';
import Navbar from '@/components/navbar.tsx/Navbar';

const Organisation = (): JSX.Element => {
    return (
        <>
            <Navbar />
            <main className="h-full flex flex-col items-center ">
                <section className="flex justify-center items-center gap-6 px-10">
                    <div className="w-1/2 flex flex-col justify-center gap-4">
                        <h1 className="text-3xl font-semibold  ">
                            Devenez l'ambassadeur de l'artisanat
                        </h1>
                        <p>
                            Notre collectif d'artisans représente les multiples
                            visages qui font l'artisanat d'aujourd'hui. Chaque
                            jour, ces artisans mettent en lumière leur
                            savoir-faire avec le grand public lors d'ateliers
                            immersifs."
                        </p>
                        <Button
                            variant="default"
                            className="w-1/2 h-11 rounded-2xl bg-[#01a274]"
                        >
                            Rejoins nous
                        </Button>
                    </div>
                    <div className="w-1/2 flex justify-center items-center overflow-hidden aspect-[4/3]">
                        <img
                            src={danseHomebis}
                            className="h-full w-full object-contain"
                        />
                    </div>
                </section>
                <section className="w-full flex h-44 bg-[#cb8501] justify-between items-center">
                    <div className="w-1/3 px-20 text-base text-white">
                        <h1>Un revenu complémentaire</h1>
                        <p>
                            Les ateliers apportent un revenu d'environ 1000
                            euros par mois aux artisans
                        </p>
                    </div>
                    {/* <span className="border-x-2"></span> */}
                    <div className="w-1/3 px-20 ">
                        <h1 className="text-base text-white">
                            Un revenu complémentaire
                        </h1>
                        <p className="text-base text-white">
                            Les ateliers apportent un revenu d'environ 1000
                            euros par mois aux artisans
                        </p>
                    </div>
                    {/* <span className="border-x-2"></span> */}
                    <div className="w-1/3 px-20 text-base text-white">
                        <h1>Un revenu complémentaire</h1>
                        <p>
                            Les ateliers apportent un revenu d'environ 1000
                            euros par mois aux artisans
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Organisation;
