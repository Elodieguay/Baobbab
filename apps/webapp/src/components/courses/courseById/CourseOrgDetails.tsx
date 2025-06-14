import { useGetCourseById } from '@/hooks/courses/query';
import { useOrganisationById } from '@/hooks/organisation/useOrganisation';
import { Quote } from 'lucide-react';
import { useParams } from 'react-router';

const CourseOrgDetails = () => {
    const params = useParams();
    const courseId = params.id;
    const { data: courseById } = useGetCourseById(courseId || '');
    const orgId = courseById?.organisationId;

    const { data: orgInfoData } = useOrganisationById(orgId || '');
    if (!orgId) {
        return;
    }
    return (
        <aside className="lg:w-1/3 flex flex-col flex-grow-0 gap-6 items-center bg-[#f0f0f0] shadow rounded-md">
            <div className="flex flex-col items-center px-4 space-y-6 ">
                <h1 className="text-2xl font-semibold text-neutral-800 mt-2">
                    Focus sur la team
                </h1>
                <div className="h-44 w-44">
                    <img
                        className="rounded-full object-cover w-full h-full"
                        src={orgInfoData?.image}
                    />
                </div>
            </div>
            <div className="bg-[#ffcd00] p-4 flex text-justify ">
                <p>
                    <Quote />
                    <span>{orgInfoData?.bio}</span>
                </p>
            </div>
        </aside>
    );
};

export default CourseOrgDetails;
