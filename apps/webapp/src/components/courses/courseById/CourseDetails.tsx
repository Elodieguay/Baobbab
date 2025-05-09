import { CoursesDTOGeojson } from '@baobbab/dtos';
import { CalendarClock, MapPinHouse, Squirrel, Timer } from 'lucide-react';
type CourseDataProps = {
    courseData?: CoursesDTOGeojson;
};
const CourseDetails = ({ courseData }: CourseDataProps) => {
    if (!courseData) {
        return null;
    }
    return (
        <div className="space-y-5 mt-12">
            <h1>Le cours en détail</h1>
            <div className="space-y-3 bg-[#01a274] rounded-md p-7">
                <h2 className="text-white">Coup d'oeil</h2>
                <p className="text-white">{courseData.description}</p>
            </div>
            <div className="flex gap-3">
                <MapPinHouse />
                <p>
                    {courseData.address} à {courseData.city}{' '}
                </p>
            </div>
            <div className="flex gap-3">
                <Timer />
                <p>La durée : {courseData.duration} minutes</p>
            </div>
            <div className="flex gap-3">
                <CalendarClock />
                <p>Le jour et l'heure</p>
            </div>
            <ul className="flex flex-col justify-center gap-2 p-2">
                {courseData.schedule.map((data, index) => (
                    <li key={index} className="">
                        {data.day} à {data.hours}
                    </li>
                ))}
            </ul>
            <div className="flex gap-3  font-bold">
                <Squirrel className="text-[#be3565]" />
                <p className="text-[#be3565]">
                    N'oublie pas tes {courseData.reminder}s
                </p>
            </div>
        </div>
    );
};

export default CourseDetails;
