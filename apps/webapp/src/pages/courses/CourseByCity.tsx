import { useParams } from 'react-router';

const CourseByCity = (): JSX.Element => {
    const { city } = useParams();
    console.log('city', city);

    return (
        <div className="flex justify-center items-center text-5xl">
            CourseByCity
        </div>
    );
};

export default CourseByCity;
