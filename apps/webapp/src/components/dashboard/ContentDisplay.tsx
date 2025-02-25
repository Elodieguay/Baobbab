import CoursesForm from '@/components/form/courses/CoursesForm';
// import { courseFormSchema } from '@baobbab/dtos';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
import { DashSubName } from './OrganisationSidebar';
import OrganisationInfosForm from '../form/organisation/OrganisationInfosForm';

export const ContentDisplay = ({
    activeItem,
    organisationId,
}: {
    organisationId: string;
    activeItem: DashSubName | null;
}): JSX.Element => {
    // const form = useForm<z.infer<typeof courseFormSchema>>({
    //     resolver: zodResolver(courseFormSchema),
    //     mode: 'onChange',
    //     defaultValues: {},
    // });

    // const handleSubmit = (): void => {};
    const contentMap: Record<string, JSX.Element> = {
        [DashSubName.CREATE]: (
            <div className="w-1/2 h-full ">
                <CoursesForm

                // organisationId={organisationId}
                />
            </div>
        ),
        [DashSubName.PROGRESS]: (
            <div>
                Liste des activités en cours.
                {/* <AddressSearch/> */}
            </div>
        ),
        [DashSubName.DELETE]: <div>Liste des activités supprimées.</div>,
        [DashSubName.EVENT_CREATE]: (
            <div>Formulaire pour créer un événement.</div>
        ),
        [DashSubName.EVENT_PROGRESS]: <div>Liste des événements en cours.</div>,
        [DashSubName.ACCOUNT_INFO]: (
            <div className="w-1/2">
                <OrganisationInfosForm organisationId={organisationId} />
            </div>
        ),
        [DashSubName.ACCOUNT_PHOTO]: <div>les photos</div>,
        [DashSubName.ACCOUNT_BIO]: <div>la bio</div>,
    };

    return (
        <div className="h-full w-full ">
            <h1 className=" text-2xl font-bold text-slate-700">{activeItem}</h1>
            <div className="flex h-full items-center justify-center">
                {activeItem ? (
                    contentMap[activeItem]
                ) : (
                    <div>Contenu non disponible.</div>
                )}
            </div>
        </div>
    );
};
