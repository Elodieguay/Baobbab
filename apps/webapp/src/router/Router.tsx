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

const router = createBrowserRouter([
    // version v7

    {
        path: AppRoutes.Home.path,
        element: <Home />,
    },
    {
        path: AppRoutes.Courses.path,
        element: <Courses />,
        children: [
            {
                path: ':city',
                element: <CourseByCity />,
            },
            {
                path: ':id',
                element: <CourseById />,
            },
        ],
    },

    // {
    //   path: AppRoutes.Login.path,
    //   element: <Login />,
    // },
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
]);
const Router = (): JSX.Element => {
    return <RouterProvider router={router} />;
};

export default Router;
