import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserBooking } from '@baobbab/dtos';
import { useDeleteUserBooking } from '@/hooks/booking/query';
import { useTranslation } from 'react-i18next';

type BookingDeleteModalProps = {
    trigger: React.ReactNode;
    booking: UserBooking;
    userId?: string;
    setIsEditModalOpen: (value: boolean) => void;
};

const BookingDeleteModal = ({
    trigger,
    booking,
    userId,
    setIsEditModalOpen,
}: BookingDeleteModalProps) => {
    const { toast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation('common', { keyPrefix: 'Profile' });
    const { mutate: deleteBooking } = useDeleteUserBooking(booking.id, userId, {
        onSuccess: () => {
            toast({
                variant: 'success',
                title: t('page.delete.modal.onSuccess'),
            });
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: t('page.delete.modal.error'),
            });
        },
    });

    const handleSubmit = () => {
        deleteBooking();
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="rounded-md gap-6 justify-center">
                <DialogTitle>
                    <DialogHeader>{t('page.delete.modal.title')}</DialogHeader>
                </DialogTitle>
                <DialogDescription>
                    {t('page.delete.modal.description')}
                </DialogDescription>
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                    >
                        {t('page.delete.modal.button.cancel')}
                    </Button>
                    <Button onClick={handleSubmit}>
                        {t('page.delete.modal.button.delete')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDeleteModal;
