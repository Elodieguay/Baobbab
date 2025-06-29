import {
    useGetOrganisation,
    useOrganisationById,
} from '@/hooks/organisation/useOrganisation';
import { Card, CardContent } from '../ui/card';
import { useAuth } from '@/context/Auth.context';

const DetailsCoursesBooked = () => {
    const { authData } = useAuth();
    const { data: organisationData } = useGetOrganisation(
        authData?.token || ''
    );
    const organisationId = organisationData?.id;
    if (!organisationId) {
        throw new Error(" Vous n'avez pas accès à cette page");
    }
    const { data: organisation } = useOrganisationById(organisationId);
    return (
        <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  w-3/4">
                <Card>
                    <CardContent className="p-6 space-y-2">
                        <h2 className="text-lg font-semibold">Vos cours</h2>
                        {organisation?.courses.map((course) => (
                            <ul
                                key={course.id}
                                className="list-disc list-inside flex gap-4"
                            >
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-16 h-10 rounded-md"
                                />
                                <li>{course.title}</li>
                            </ul>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 space-y-2">
                        <h2 className="text-lg font-semibold">
                            Personnes inscrites
                        </h2>
                        {organisation?.courses.map((course) =>
                            course.booking.length === 0 ? (
                                <p
                                    key={course.id}
                                    className="text-xs text-gray-500"
                                >
                                    Aucun cours d'essai pour —
                                    <em>{course.title}</em>
                                </p>
                            ) : (
                                <ul key={course.id} className="space-y-1">
                                    {course.booking.map((b, i) => (
                                        <li key={i} className="text-sm">
                                            <span className="font-medium ">
                                                {course.booking.length} personne
                                                pour
                                            </span>
                                            — <em>{course.title}</em> (
                                            {b.schedule.day})
                                        </li>
                                    ))}
                                </ul>
                            )
                        )}
                    </CardContent>
                </Card>
            </div>
            <Card className="w-3/4">
                <CardContent className="p-9 space-y-2 ">
                    <h2 className="text-lg font-semibold text-red-600">
                        📢 Note d'information
                    </h2>
                    <p>
                        Pour le moment, la création de cours en ligne n’est pas
                        encore disponible sur la plateforme. Si vous souhaitez
                        ajouter de nouveaux cours ou les mettre à jour, vous
                        pouvez nous contacter à :
                    </p>
                    <p className="font-semibold text-center">pro@baobbab.fr</p>
                    <p>Notre équipe se fera un plaisir de vous accompagner.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DetailsCoursesBooked;
