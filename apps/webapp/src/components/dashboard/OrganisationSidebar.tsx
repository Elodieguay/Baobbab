import * as React from 'react';
import { LogOut } from 'lucide-react';

import { NavMain } from '@/components/dashboard/sidebar/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { ContentDisplay } from '@/components/dashboard/ContentDisplay';
import { useOrganisationById } from '@/hooks/organisation/useOrganisation';
import { useAuth } from '@/context/Auth.context';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

export enum DashName {
    ACCOUNT_INFO = 'Informations',
    CREATE = 'Créer une activité',
    PROGRESS = 'Activités en cours',
    BOOKING = 'Activités réservées',
}

const organisationId = sessionStorage.getItem('organisationId');
const navMainItems = [
    {
        title: DashName.ACCOUNT_INFO,
        url: `/dashboard/${organisationId}/informations`,
        isActive: true,
    },
    {
        title: DashName.CREATE,
        url: `/dashboard/${organisationId}/createCourse`,
    },
    {
        title: DashName.PROGRESS,
        url: `/dashboard/${organisationId}/allCourses`,
    },
    {
        title: DashName.BOOKING,
        url: `/dashboard/${organisationId}/usersBookingTable`,
    },
];

export function OrganisationSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
    const [activeItem, setActiveItem] = useState<DashName | null>();
    const organisationId = sessionStorage.getItem('organisationId');
    const { removeAuthToken } = useAuth();
    const navigate = useNavigate();

    if (!organisationId) {
        throw new Error(" Vous n'avez pas accès à cette page");
    }

    const { data: organisation } = useOrganisationById(organisationId);

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
                className="bg-[#0b927a] text-white font-semibold"
                {...props}
            >
                <SidebarHeader>{organisation?.organisationName}</SidebarHeader>
                <SidebarContent>
                    <NavMain
                        items={navMainItems}
                        onItemClick={(item) =>
                            setActiveItem(item.title as DashName)
                        }
                    />
                </SidebarContent>
                <SidebarFooter>
                    <div className="text-sm mb-2">{organisation?.email}</div>
                    <Button
                        className="p-4 px-6 bg-[#01a274] text-white gap-2"
                        variant={'ghost'}
                        onClick={handleLogout}
                    >
                        <LogOut />
                        <p>Se déconnecter</p>
                    </Button>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <div className="flex-1">
                {activeItem && <ContentDisplay activeItem={activeItem} />}
            </div>
        </div>
    );
}
