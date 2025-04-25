import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserBooking } from '@baobbab/dtos';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import CourseDeleteModal from '../CourseDeleteModal';
import { useGetUser } from '@/hooks/user/query';
import { useAuth } from '@/context/Auth.context';

export type CellRowUserProps = {
    cellData: UserBooking;
};
export const CellRowCourses = ({ cellData }: CellRowUserProps) => {
    const { authToken } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { data } = useGetUser(authToken || '');
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
                            Supprimer
                        </DropdownMenuItem>
                    }
                    booking={cellData}
                    userId={userId}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
