import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardTest = (): JSX.Element => {
    return (
        <SidebarProvider>
            <AppSidebar />
        </SidebarProvider>
    );
};

export default DashboardTest;
