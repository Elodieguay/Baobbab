import Navbar from '@/components/navbar.tsx/Navbar';
import { Outlet } from 'react-router';

const Courses = (): JSX.Element => {
    return (
        <div className="h-full flex flex-col relative">
            <div className="flex flex-col justify-center items-center">
                <Navbar />
            </div>
            <div className="h-screen">
                <Outlet />
            </div>
            <div></div>
            <div className="flex  justify-end sticky bottom-0 ">
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default Courses;
