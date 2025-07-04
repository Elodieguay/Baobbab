import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import AppRoutes from './AppRoutes';
import Courses from '../pages/courses/Courses';
import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import Organisation from '@/pages/organisation/Organisation';
import ForgottenPassword from '@/components/auth/ForgottenPassword';
import ResetPassword from '@/components/auth/ResetPassword';
import Footer from '@/components/footer/Footer';
import CoursesForm from '@/components/dashboard/CoursesForm';
import HomePage from '@/pages/home/HomePage';
import NotFound from '@/pages/notFound/NotFound';
import PrivatyPolicy from '@/pages/privatyPolicy/PrivatyPolicy';
import { lazy } from 'react';
import InformationsForm from '@/components/form/organisation/InformationsForm';
import DetailsCoursesBooked from '@/components/dashboard/DetailsCoursesBooked';
import NotLogin from '@/pages/notFound/NotLogin';
const CourseByCity = lazy(() => import('@/pages/courses/CourseByCity'));
const CourseById = lazy(() => import('@/pages/courses/CourseById'));

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
                path: AppRoutes.Dashboard.path,
                element: <Dashboard />,
                children: [
                    {
                        path: '',
                        index: true,
                        element: <Navigate to="allCourses" replace />,
                    },
                    {
                        path: 'createCourse',
                        element: <CoursesForm />,
                    },
                    {
                        path: 'allCourses',
                        element: <DetailsCoursesBooked />,
                    },
                    {
                        path: 'informations',
                        element: <InformationsForm />,
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
        path: AppRoutes.PrivatyPolicy.path,
        element: <PrivatyPolicy />,
    },
    {
        path: AppRoutes.Error404.path,
        element: <NotFound />,
    },
    {
        path: AppRoutes.Error401.path,
        element: <NotLogin />,
    },
    {
        path: '*',
        element: <NotFound />,
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
