import { Link } from 'react-router';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import React from 'react';
import { cn } from '@/utils/utils';

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                {/* <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a> */}
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';

const NavbarMenu = (): JSX.Element => {
    const components: { title: string; href: string; description: string }[] = [
        {
            title: 'Alert Dialog',
            href: '/docs/primitives/alert-dialog',
            description:
                'A modal dialog that interrupts the user with important content and expects a response.',
        },
        {
            title: 'Hover Card',
            href: '/docs/primitives/hover-card',
            description:
                'For sighted users to preview content available behind a link.',
        },
        {
            title: 'Progress',
            href: '/docs/primitives/progress',
            description:
                'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
        },
        {
            title: 'Scroll-area',
            href: '/docs/primitives/scroll-area',
            description: 'Visually or semantically separates content.',
        },
        {
            title: 'Tabs',
            href: '/docs/primitives/tabs',
            description:
                'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
        },
        {
            title: 'Tooltip',
            href: '/docs/primitives/tooltip',
            description:
                'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
        },
    ];

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-none">
                        Arts & Culture
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    // href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        Sports & Danses
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Bénévolat</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/docs">
                        {/* <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Evènements
                        </NavigationMenuLink> */}
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarMenu;
