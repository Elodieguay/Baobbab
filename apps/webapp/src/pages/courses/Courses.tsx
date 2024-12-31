import Navbar from '@/components/navbar.tsx/Navbar';
import { Outlet } from 'react-router';

const Courses = (): JSX.Element => {
    //  const {city} = useParams()
    return (
        <div>
            <Navbar />

            <Outlet />
        </div>
    );
};

export default Courses;
