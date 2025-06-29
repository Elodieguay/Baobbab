import CoursesForm from '@/components/dashboard/CoursesForm';
import { DashName } from './OrganisationSidebar';
import InformationsForm from '../form/organisation/InformationsForm';
import DetailsCoursesBooked from './DetailsCoursesBooked';

export const ContentDisplay = ({
    activeItem,
}: {
    activeItem: DashName;
}): JSX.Element => {
    const contentMap: Record<DashName, JSX.Element> = {
        [DashName.ACCOUNT_INFO]: <InformationsForm />,
        [DashName.CREATE]: <CoursesForm />,
        [DashName.BOOKING]: <DetailsCoursesBooked />,
    };

    return (
        <div className="w-full border-4 border-amber-700">
            <h1 className=" text-2xl font-bold text-slate-700  border-4 border-amber-700">
                {activeItem} je suis ici
            </h1>
            <div className="w-full">
                {activeItem ? (
                    contentMap[activeItem]
                ) : (
                    <div>Contenu non disponible.</div>
                )}
            </div>
        </div>
    );
};
