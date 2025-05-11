import { OrganisationSidebar } from '@/components/dashboard/OrganisationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

const Dashboard = (): JSX.Element => {
    return (
        <SidebarProvider>
            <div className="flex">
                <OrganisationSidebar />
                <div className="flex flex-1 w-full items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Dashboard;
