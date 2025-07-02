import { LogOut } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/Auth.context';
import { Button } from '../ui/button';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { Trans } from 'react-i18next';
import { useOrganisationById } from '@/hooks/organisation/useOrganisation';
import { OrganisationProfile } from '@baobbab/dtos';
import { useQueryClient } from '@tanstack/react-query';
import log from 'loglevel';

interface OrganisationSidebarContentProps {
    organisation: OrganisationProfile;
}
export function OrganisationSidebar({
    organisation,
}: OrganisationSidebarContentProps): JSX.Element {
    const organisationId = organisation.id;
    const queryClient = useQueryClient();
    const { removeAuthData } = useAuth();

    const navigate = useNavigate();
    if (!organisationId) {
        throw new Error(" Vous n'avez pas accès à cette page");
    }

    const { data: organisationData } = useOrganisationById(organisationId);
    log.debug('organisationData', organisationData);
    const handleLogout = (): void => {
        if (removeAuthData) {
            removeAuthData();
        }
        queryClient.clear();
        navigate('/organisation');
    };

    return (
        <div className="flex w-full h-full justify-center items-center">
            <Sidebar
                collapsible="icon"
                className="bg-[#be3565] text-white font-semibold p-5"
            >
                <SidebarHeader className="gap-10 text-white">
                    <Link to="/">
                        <h1 className="text-3xl font-semibold font-poppins">
                            <Trans
                                i18nKey="Navbar.logob"
                                components={{
                                    span: <span className="text-[#ffffff] " />,
                                }}
                            />
                        </h1>
                    </Link>
                    <h3 className="text-white">
                        {organisationData?.organisationName}
                    </h3>
                </SidebarHeader>
                <SidebarContent className="flex flex-col text-lg items-start p-4">
                    <NavLink to={`/dashboard/${organisationId}/allCourses`}>
                        Détails des réservations
                    </NavLink>
                    <NavLink to={`/dashboard/${organisationId}/informations`}>
                        Informations
                    </NavLink>
                    <NavLink to={`/dashboard/${organisationId}/createCourse`}>
                        Créer un cours
                    </NavLink>
                </SidebarContent>
                <SidebarFooter>
                    <div className=" mb-2 ">
                        <p className="text-white text-base">
                            {organisationData?.email}
                        </p>
                    </div>

                    <Button
                        onClick={handleLogout}
                        className="p-4 px-6 bg-[#ffffff] text-white gap-2"
                        variant="ghost"
                    >
                        <LogOut className="text-slate-400" />
                        <p>Se déconnecter</p>
                    </Button>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <div className=" flex flex-1 p-6 overflow-y-auto justify-center items-center w-full">
                <Outlet />
            </div>
        </div>
    );
}
