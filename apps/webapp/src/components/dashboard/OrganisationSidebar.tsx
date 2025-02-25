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
    ACTIVITY = 'Activités',
    EVENT = 'Evenements',
    ACCOUNT = 'Mon compte',
}

export enum DashSubName {
    CREATE = 'Créer une activité',
    PROGRESS = 'Activités en cours',
    DELETE = 'Activités supprimées',
    EVENT_CREATE = 'Créer un évènement',
    EVENT_PROGRESS = 'Evènement en cours',
    ACCOUNT_INFO = 'Informations',
    ACCOUNT_PHOTO = 'Photo',
    ACCOUNT_BIO = 'Biographie',
}

const data = {
    navMain: [
        {
            title: DashSubName.CREATE,
            url: '#',
            isActive: true,
        },
        {
            title: DashSubName.PROGRESS,
            url: '#',
        },
        {
            title: DashSubName.DELETE,
            url: '#',
        },
        {
            title: DashSubName.EVENT_CREATE,
            url: '#',
        },
        {
            title: DashSubName.EVENT_PROGRESS,
            url: '#',
        },
        {
            title: DashSubName.ACCOUNT_INFO,
            url: '#',
        },
        {
            title: DashSubName.ACCOUNT_PHOTO,
            url: '#',
        },
        {
            title: DashSubName.ACCOUNT_BIO,
            url: '#',
        },
    ],
};

export function OrganisationSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
    const [activeItem, setActiveItem] = useState<DashSubName | null>();
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
        <div className="flex w-full">
            <Sidebar
                collapsible="icon"
                className="bg-[#0b927a] text-white font-semibold"
                {...props}
            >
                <SidebarHeader>{organisation?.organisationName}</SidebarHeader>
                <SidebarContent>
                    <NavMain
                        items={data.navMain}
                        onItemClick={(item) => {
                            setActiveItem(item.title as DashSubName);
                        }}
                    />
                </SidebarContent>
                <SidebarFooter>
                    {organisation?.email}
                    <Button
                        className=" p-4 px-6 bg-[#01a274] text-white gap-2"
                        variant={'ghost'}
                        onClick={handleLogout}
                    >
                        <LogOut />
                        <p>Se déconnecter</p>
                    </Button>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <div className="p-4 border-2 w-full h-full ">
                {activeItem && (
                    <ContentDisplay
                        activeItem={activeItem}
                        organisationId={organisationId}
                    />
                )}
            </div>
        </div>
    );
}
