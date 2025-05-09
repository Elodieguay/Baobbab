import { OrganisationSidebar } from '@/components/dashboard/OrganisationSidebar';
import Navbar from '@/components/navbar.tsx/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

const Dashboard = (): JSX.Element => {
    return (
        <>
            <SidebarProvider>
                <div className="flex w-full h-full">
                    <OrganisationSidebar />
                </div>
            </SidebarProvider>
        </>
    );
};

export default Dashboard;
