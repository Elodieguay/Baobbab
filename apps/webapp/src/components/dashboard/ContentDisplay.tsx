import CoursesForm from '@/components/dashboard/CoursesForm';
// import { courseFormSchema } from '@baobbab/dtos';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
import { DashName } from './OrganisationSidebar';
import AllCoursesTable from './AllCoursesTable';
import UsersBookingTable from './UsersBookingTable';
import OrganisationInfo from './OrganisationInfo';

export const ContentDisplay = ({
    activeItem,
}: {
    activeItem: DashName | null;
}): JSX.Element => {
    const contentMap: Record<DashName, JSX.Element> = {
        [DashName.ACCOUNT_INFO]: <OrganisationInfo />,
        [DashName.CREATE]: <CoursesForm />,
        [DashName.PROGRESS]: <AllCoursesTable />,
        [DashName.BOOKING]: <UsersBookingTable />,
    };

    return (
        <div className="w-full">
            <h1 className=" text-2xl font-bold text-slate-700">{activeItem}</h1>
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
