import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserBooking } from '@baobbab/dtos';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import CourseDeleteModal from '../CourseDeleteModal';
import { useGetUser } from '@/hooks/user/query';
import { useAuth } from '@/context/Auth.context';
import { useTranslation } from 'react-i18next';
import CourseUpdateModal from '../CourseUpdateModal';
import { useGetBookingById } from '@/hooks/booking/query';
import log from 'loglevel';

export type CellRowUserProps = {
    cellData: UserBooking;
};
export const CellRowCourses = ({ cellData }: CellRowUserProps) => {
    const { authToken } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { data } = useGetUser(authToken || '');
    const bookingId = cellData.id;
    log.debug(bookingId);
    log.debug('cellData', cellData);
    const { t } = useTranslation('common', {
        keyPrefix: 'Profile',
    });
    const userId = data?.id;
    return (
        <DropdownMenu
            open={isEditModalOpen}
            onOpenChange={(open) => setIsEditModalOpen(open)}
        >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <CourseDeleteModal
                    trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            {t('page.delete.modal.button.delete')}
                        </DropdownMenuItem>
                    }
                    booking={cellData}
                    userId={userId}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
                <DropdownMenuSeparator />
                <CourseUpdateModal
                    trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            {t('page.update.modal.button.update')}
                        </DropdownMenuItem>
                    }
                    booking={cellData}
                    userId={userId}
                    // setIsEditModalOpen={setIsEditModalOpen}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
