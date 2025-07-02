import { OrganisationSidebar } from '@/components/dashboard/OrganisationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/Auth.context';
import { useGetOrganisation } from '@/hooks/organisation/useOrganisation';
import NotLogin from '../notFound/NotLogin';

const Dashboard = (): JSX.Element => {
    const { authData } = useAuth();
    const { data: organisation } = useGetOrganisation();
    if (!authData?.token) {
        return (
            <div>
                <NotLogin />
            </div>
        );
    }
    if (!organisation) {
        return (
            <div>
                <NotLogin />
            </div>
        );
    }
    return (
        <SidebarProvider>
            <div className="flex justify-center items-center w-4/5 h-full">
                <OrganisationSidebar organisation={organisation} />
            </div>
        </SidebarProvider>
    );
};

export default Dashboard;
