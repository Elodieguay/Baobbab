import { useAuth } from '../context/Auth.context';
import AppRoutes, { RouteAccessMode, RouteNames } from './AppRoutes';
import { UserRole } from './enumRoute';
import { Outlet, useLocation } from 'react-router';
import { Navigate } from 'react-router';

const ProtectedRoutes = (): JSX.Element => {
    // console.log('AppRoutes:', AppRoutes);
    const location = useLocation();

    const { authToken, role } = useAuth();
    // console.log('authToken:', authToken, 'role:', role);

    const findCurrentRoute = (
        pathname: string
    ): (typeof AppRoutes)[keyof typeof AppRoutes] | undefined => {
        return Object.values(AppRoutes).find((route) => {
            if (route.path?.toLowerCase() === pathname.toLowerCase()) {
                return true;
            }
            console.log(
                `Path mismatch: pathname=${pathname}, routePath=${route.path}`
            );
            return false;
        });
    };
    const currentRoute = findCurrentRoute(location.pathname);
    // console.log('currentRoute:', currentRoute);

    // Redirection si l'utilisateur n'est pas authentifié
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        !authToken
    ) {
        return <Navigate to={AppRoutes.Courses.path ?? '/courses'} />;
    }

    // Gestion de la route booking
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        currentRoute.path === AppRoutes.Booking.path &&
        role !== UserRole.USER
    ) {
        const redirectTo = AppRoutes.Booking.redirects as {
            authenticated: RouteNames;
            unauthenticated: RouteNames;
        };
        const navigateTo = redirectTo.unauthenticated ?? '/';
        return <Navigate to={navigateTo} />;
    }

    // Gestion de la route admin
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        currentRoute.path === AppRoutes.Dashboard.path &&
        role !== UserRole.ADMIN
    ) {
        return <Navigate to={AppRoutes.Courses.path ?? '/courses'} />;
    }

    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        currentRoute.path === AppRoutes.Profile.path &&
        role !== UserRole.USER
    ) {
        return <Navigate to={AppRoutes.Courses.path ?? '/courses'} />;
    }

    // Vérifie les redirections spécifiées dans `AppRoutes`
    if (currentRoute?.redirects) {
        const route =
            typeof currentRoute.redirects === 'object'
                ? authToken
                    ? currentRoute.redirects.authenticated
                    : currentRoute.redirects.unauthenticated
                : currentRoute.redirects;

        return <Navigate to={AppRoutes[route]?.path ?? '/'} />;
    }

    // // Vérifie les accès basés sur les rôles
    // const roleRedirect = redirectByRole(currentRoute?.accessMode);
    // if (roleRedirect) {
    //     return <Navigate to={roleRedirect} />;
    // }

    // Pas de redirection nécessaire, rendu de la route
    return <Outlet />;
};

export default ProtectedRoutes;
