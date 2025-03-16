import { createBrowserRouter, RouterProvider } from 'react-router';
import AppRoutes from './AppRoutes';
import Home from '../pages/home/Home';
import Courses from '../pages/courses/Courses';
import Booking from '../pages/courses/Booking';
import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import CourseById from '@/pages/courses/CourseById';
import CourseByCity from '@/pages/courses/CourseByCity';
// import ModalAuth from '@/components/auth/ModalAuth';
import Organisation from '@/pages/organisation/Organisation';
import ForgottenPassword from '@/components/auth/ForgottenPassword';
import ResetPassword from '@/components/auth/ResetPassword';
import Footer from '@/components/footer/Footer';

const router = createBrowserRouter([
    // version v7

    {
        path: AppRoutes.Home.path,
        element: (
            <>
                <Home />
                <Footer />
            </>
        ),
    },
    {
        path: AppRoutes.ForgottenPassword.path,
        element: <ForgottenPassword />,
    },
    {
        path: AppRoutes.ResetPassword.path,
        element: <ResetPassword />,
    },
    {
        path: AppRoutes.Courses.path,
        element: (
            <>
                <Courses />
                <Footer />
            </>
        ),
        children: [
            {
                path: ':city',
                element: <CourseByCity />,
            },
            {
                path: ':city/:id',
                element: <CourseById />,
            },
        ],
    },
    {
        path: AppRoutes.Organisation.path,
        element: <Organisation />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: AppRoutes.Booking.path,
                element: <Booking />,
            },
            {
                path: AppRoutes.Dashboard.path,
                element: <Dashboard />,
            },
            {
                path: AppRoutes.Profile.path,
                element: <Profile />,
            },
        ],
    },
    {
        path: AppRoutes.Error404.path,
        element: <h1>404 - Page non trouvée</h1>,
    },
]);
const Router = (): JSX.Element => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default Router;
