import { createBrowserRouter, RouterProvider } from 'react-router';
import AppRoutes from './AppRoutes';
import Courses from '../pages/courses/Courses';
import Booking from '../pages/courses/Booking';
import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import CourseById from '@/pages/courses/CourseById';
import CourseByCity from '@/pages/courses/CourseByCity';
import Organisation from '@/pages/organisation/Organisation';
import ForgottenPassword from '@/components/auth/ForgottenPassword';
import ResetPassword from '@/components/auth/ResetPassword';
import Footer from '@/components/footer/Footer';
import CoursesForm from '@/components/dashboard/CoursesForm';
import UsersBookingTable from '@/components/dashboard/UsersBookingTable';
import AllCoursesTable from '@/components/dashboard/AllCoursesTable';
import OrganisationInfo from '@/components/dashboard/OrganisationInfo';
import HomePage from '@/pages/home/HomePage';

const router = createBrowserRouter([
    // version v7

    {
        path: AppRoutes.Home.path,
        element: (
            <>
                <HomePage />
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
                children: [
                    {
                        path: 'createCourse',
                        element: <CoursesForm />,
                    },
                    {
                        path: 'usersBookingTable',
                        element: <UsersBookingTable />,
                    },
                    {
                        path: 'allCourses',
                        element: <AllCoursesTable />,
                    },
                    {
                        path: 'informations',
                        element: <OrganisationInfo />,
                    },
                ],
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
