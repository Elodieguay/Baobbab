export enum RouteNames {
    // Public routes
    Home = 'Home',
    Courses = 'Courses',
    Login = 'Login',
    Register = 'Register',
    Organisation = 'Organisation',

    // action de validation de l'inscription
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
        path: '/forgotten-password',
        accessMode: RouteAccessMode.UnAuthenticated,
    },
    ResetPassword: {
        path: '/reset-password',
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
        path: '/booking',
        accessMode: RouteAccessMode.Authenticated,
        // redirects: {
        //   authenticated: RouteNames.CourseById,
        //   unauthenticated: RouteNames.Login
        // }
    },
    Dashboard: {
        path: '/dashboard',
        accessMode: RouteAccessMode.Authenticated,
    },
    Profile: {
        path: '/profile',
        accessMode: RouteAccessMode.Authenticated,
    },
};

export default AppRoutes;
