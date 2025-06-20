import { OrganisationSidebar } from '@/components/dashboard/OrganisationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = (): JSX.Element => {
    return (
        <SidebarProvider>
            <div className="flex">
                <OrganisationSidebar />
            </div>
        </SidebarProvider>
    );
};

export default Dashboard;
