'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLocation, useNavigate } from 'react-router';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
    onItemClick: (items: { title: string }) => void;
}): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                className={
                                    isActive ? 'bg-accent text-white' : ''
                                }
                                onClick={() => navigate(item.url)}
                            >
                                <span className="flex items-center gap-2">
                                    {item.icon && <item.icon size={24} />}
                                    <span>{item.title}</span>
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
