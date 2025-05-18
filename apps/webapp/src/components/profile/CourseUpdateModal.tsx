import { BookingResponse, ModeBooking } from '@baobbab/dtos';
import ModalBooking from '../booking/ModalBooking';
import {
    DialogContent,
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { useGetCourseById } from '@/hooks/courses/query';
import { useTranslation } from 'react-i18next';

interface CourseUpdateModalProps {
    trigger: React.ReactNode;
    booking: BookingResponse;
    userId?: string;
    setIsEditModalOpen?: (value: boolean) => void;
}
const CourseUpdateModal = ({ trigger, booking }: CourseUpdateModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation('common', { keyPrefix: 'Booking' });
    const id = booking.courses.id;
    const { data: courseData } = useGetCourseById(id ?? '');

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className=" flex flex-col rounded-md gap-6 justify-center items-center ">
                <DialogTitle>
                    <DialogHeader>{t('course.update')}</DialogHeader>
                </DialogTitle>
                <DialogDescription className="space-y-4 w-full"></DialogDescription>
                <ModalBooking
                    courseData={courseData}
                    bookingId={booking.id}
                    mode={ModeBooking.UPDATE}
                    setIsModalOpen={setIsModalOpen}
                />
            </DialogContent>
        </Dialog>
    );
};
export default CourseUpdateModal;
