import { CoursesDTOGeojson, UserBooking } from '@baobbab/dtos';
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
import { useGetBookingById } from '@/hooks/booking/query';

interface CourseUpdateModalProps {
    trigger: React.ReactNode;
    booking: UserBooking;
    userId?: string;
    isEditModalOpen?: boolean;
    setIsEditModalOpen?: (value: boolean) => void;
    courseData?: CoursesDTOGeojson | undefined;
}
const CourseUpdateModal = ({
    trigger,
    booking,
    // isEditModalOpen,
    // setIsEditModalOpen,
}: CourseUpdateModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="flex flex-col justify-center items-center font-normal p-10 rounded-2xl ">
                <DialogTitle>
                    <DialogHeader>Modifier la réservation</DialogHeader>
                </DialogTitle>
                <DialogDescription className="space-y-4 flex flex-col  justify-center items-center"></DialogDescription>
                <ModalBooking booking={booking} mode="update" />
            </DialogContent>
        </Dialog>
    );
};
export default CourseUpdateModal;
