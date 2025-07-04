export enum RouteNames {
    // Public routes
    Home = 'Home',
    Courses = 'Courses',
    Login = 'Login',
    Register = 'Register',
    Organisation = 'Organisation',
    PrivatyPolicy = 'PrivatyPolicy',
    Error404 = 'Error404',
    Error401 = 'Error401',
    ForgottenPassword = 'ForgottenPassword',
    ResetPassword = 'ResetPassword',
    ChangePassword = 'ChangePassword',
    VerifyEmail = 'VerifyEmail',

    // Private routes
    Dashboard = 'Dashboard',
    Profile = 'Profile',
    Booking = 'Booking',
}

export enum RouteAccessMode {
    Public = 'Public',
    Admin = 'Admin',
    Authenticated = 'Authenticated',
    UnAuthenticated = 'UnAuthenticated',
}

export interface AppRoute {
    path?: string;
    accessMode: RouteAccessMode;
    redirects?:
        | RouteNames
        | {
              authenticated: RouteNames;
              unauthenticated: RouteNames;
          };
}

const AppRoutes: { [key in RouteNames]: AppRoute } = {
    Home: {
        path: '/',
        accessMode: RouteAccessMode.Public,
    },
    Courses: {
        path: '/courses',
        accessMode: RouteAccessMode.Public,
    },
    Login: {
        path: '/login',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    Register: {
        path: '/register',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    Organisation: {
        path: '/organisation',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    ForgottenPassword: {
        path: '/forgotPassword',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    ResetPassword: {
        path: '/resetPassword/:token',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    ChangePassword: {
        path: '/change-password',
        accessMode: RouteAccessMode.Authenticated,
    },
    VerifyEmail: {
        path: '/verify-email',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    Booking: {
        path: '/booking/:id',
        accessMode: RouteAccessMode.Authenticated,
    },
    Dashboard: {
        path: '/dashboard/:id',
        accessMode: RouteAccessMode.Authenticated,
    },
    Profile: {
        path: '/profile',
        accessMode: RouteAccessMode.Authenticated,
    },
    PrivatyPolicy: {
        path: '/privatyPolicy',
        accessMode: RouteAccessMode.Public,
    },
    Error404: {
        path: '*',
        accessMode: RouteAccessMode.Public,
    },
    Error401: {
        path: '/error401',
        accessMode: RouteAccessMode.Public,
    },
};

export default AppRoutes;
