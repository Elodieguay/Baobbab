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
        <div className="space-y-6 mt-12 px-4">
            <h1 className="text-2xl font-bold text-[#01a274]">
                Le cours en détail
            </h1>

            <div className="space-y-3 bg-[#01a274] rounded-md p-6 text-white">
                <h2 className="text-lg font-semibold">Coup d'œil</h2>
                <p>{courseData.description}</p>
            </div>

            <div className="flex items-start gap-3">
                <MapPinHouse className="text-[#01a274] min-w-[24px]" />
                <p className="text-base">
                    {courseData.address} à {courseData.city}
                </p>
            </div>

            <div className="flex items-start gap-3">
                <Timer className="text-[#01a274] min-w-[24px]" />
                <p className="text-base">
                    Durée : {courseData.duration} minutes
                </p>
            </div>

            <div className="flex items-start gap-3">
                <CalendarClock className="text-[#01a274] min-w-[24px]" />
                <div>
                    <p className="text-base font-medium">Jour et heure :</p>
                    <ul className="ml-1 mt-2 list-disc pl-4 text-sm space-y-1">
                        {courseData.schedule.map((data, index) => (
                            <li key={index}>
                                {data.day} à {data.hours}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Rappel */}
            <div className="flex items-start gap-3 font-bold">
                <Squirrel className="text-[#be3565] min-w-[24px]" />
                <p className="text-[#be3565]">
                    N'oublie pas tes {courseData.reminder}s
                </p>
            </div>
        </div>
    );
};

export default CourseDetails;
