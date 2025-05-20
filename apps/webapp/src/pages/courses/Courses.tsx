import Navbar from '@/components/navbar/Navbar';
import { Outlet } from 'react-router';

const Courses = (): JSX.Element => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="flex flex-col justify-center items-center">
                <Navbar />
            </div>
            <div className="min-h-screen ">
                <Outlet />
            </div>
        </div>
    );
};

export default Courses;
