import * as React from 'react';
import { LogOut } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Button } from '../ui/button';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { Trans } from 'react-i18next';
import { useOrganisationById } from '@/hooks/organisation/useOrganisation';
import log from 'loglevel';

export enum DashName {
    ACCOUNT_INFO = 'Informations',
    CREATE = 'Créer une activité',
    BOOKING = 'Activités réservées',
}

export function OrganisationSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
    const [activeItem, setActiveItem] = useState<DashName>(
        DashName.ACCOUNT_INFO
    );
    const organisationId = sessionStorage.getItem('organisationId');

    const { removeAuthToken } = useAuth();
    const navigate = useNavigate();
    if (!organisationId) {
        throw new Error(" Vous n'avez pas accès à cette page");
    }

    const { data: organisation } = useOrganisationById(organisationId);
    log.debug(organisation);
    const handleLogout = (): void => {
        if (removeAuthToken) {
            removeAuthToken();
        }
        sessionStorage.removeItem('organisationId');
        navigate('/organisation');
    };

    return (
        <div className="flex w-full h-full">
            <Sidebar
                collapsible="icon"
                className="bg-[#be3565] text-white font-semibold p-5"
                {...props}
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
                        {organisation?.organisationName}
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
                            {organisation?.email}
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
            <div className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
