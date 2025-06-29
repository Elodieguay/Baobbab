import { UserRole } from '@baobbab/dtos';
import { useAuth } from '../context/Auth.context';
import AppRoutes, { RouteAccessMode, RouteNames } from './AppRoutes';
import { Outlet, useLocation } from 'react-router';
import { Navigate } from 'react-router';

const ProtectedRoutes = (): JSX.Element => {
    const location = useLocation();

    const { authData, loading } = useAuth();
    if (loading) {
        return <></>;
    }
    const findCurrentRoute = (
        pathname: string
    ): (typeof AppRoutes)[keyof typeof AppRoutes] | undefined => {
        return Object.values(AppRoutes).find((route) => {
            if (route.path?.toLowerCase() === pathname.toLowerCase()) {
                return true;
            }
            return false;
        });
    };
    const currentRoute = findCurrentRoute(location.pathname);

    // Redirection si l'utilisateur n'est pas authentifié
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        !authData?.token
    ) {
        return <Navigate to={AppRoutes.Home.path ?? '/'} />;
    }

    // booking route
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        currentRoute.path === AppRoutes.Booking.path &&
        authData?.role !== UserRole.USER
    ) {
        const redirectTo = AppRoutes.Booking.redirects as {
            authenticated: RouteNames;
            unauthenticated: RouteNames;
        };
        const navigateTo = redirectTo.unauthenticated ?? '/';
        return <Navigate to={navigateTo} />;
    }

    // Admin route
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        currentRoute.path === AppRoutes.Dashboard.path &&
        authData?.role !== UserRole.ADMIN
    ) {
        return <Navigate to={AppRoutes.Courses.path ?? '/courses'} />;
    }

    //  User route
    if (
        currentRoute?.accessMode === RouteAccessMode.Authenticated &&
        currentRoute.path === AppRoutes.Profile.path &&
        authData?.role !== UserRole.USER
    ) {
        return <Navigate to={AppRoutes.Error404.path ?? '/'} />;
    }

    // Vérifie les redirections spécifiées dans `AppRoutes`
    if (currentRoute?.redirects) {
        const route =
            typeof currentRoute.redirects === 'object'
                ? authData?.token
                    ? currentRoute.redirects.authenticated
                    : currentRoute.redirects.unauthenticated
                : currentRoute.redirects;

        return <Navigate to={AppRoutes[route]?.path ?? '/'} />;
    }

    // Pas de redirection nécessaire, rendu de la route
    return <Outlet />;
};

export default ProtectedRoutes;
