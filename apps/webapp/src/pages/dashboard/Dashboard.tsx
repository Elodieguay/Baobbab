import { OrganisationSidebar } from '@/components/dashboard/OrganisationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/Auth.context';
import { useGetOrganisation } from '@/hooks/organisation/useOrganisation';
import log from 'loglevel';
import { useTranslation } from 'react-i18next';

const Dashboard = (): JSX.Element => {
    const { authData } = useAuth();
    const { t } = useTranslation('common', {
        keyPrefix: 'Profile',
    });
    const { data: organisation } = useGetOrganisation();
    log.debug('Organisation data:', organisation);
    if (!authData?.token) {
        return <div>{t('page.error.authToken')}</div>;
    }
    if (!organisation) {
        return <div>{t('page.loading.data.user')}</div>;
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
