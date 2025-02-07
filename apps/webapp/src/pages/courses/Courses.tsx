import Navbar from '@/components/navbar.tsx/Navbar';
import { Outlet } from 'react-router';
import TestCourseById from './TestCourseById';
import CourseByCity from './TestCourseById';

const Courses = (): JSX.Element => {
    //  const {city} = useParams()
    return (
        <>
            <div>
                <Navbar />
                <Outlet />
            </div>
            <div>
                <TestCourseById />
            </div>
        </>
    );
};

export default Courses;
