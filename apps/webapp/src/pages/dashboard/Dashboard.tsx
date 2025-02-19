import { OrganisationSidebar } from '@/components/dashboard/OrganisationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = (): JSX.Element => {
    return (
        <SidebarProvider>
            <OrganisationSidebar />
        </SidebarProvider>
    );
};

export default Dashboard;
