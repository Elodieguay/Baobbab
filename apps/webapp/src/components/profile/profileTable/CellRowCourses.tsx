import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookingResponse } from '@baobbab/dtos';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import CourseDeleteModal from '../CourseDeleteModal';
import { useGetUser } from '@/hooks/user/query';
import { useAuth } from '@/context/Auth.context';
import CourseUpdateModal from '../CourseUpdateModal';

export type CellRowUserProps = {
    cellData: BookingResponse;
};
export const CellRowCourses = ({ cellData }: CellRowUserProps) => {
    const { authData } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { data } = useGetUser({
        enabled: !!authData?.token,
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
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="flex flex-col"
                >
                    <CourseDeleteModal
                        trigger={<Button variant="ghost">Supprimer</Button>}
                        booking={cellData}
                        userId={userId}
                        setIsEditModalOpen={setIsEditModalOpen}
                    />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <CourseUpdateModal
                        trigger={<Button variant="ghost">Modifier</Button>}
                        userId={userId}
                        setIsEditModalOpen={setIsEditModalOpen}
                        booking={cellData}
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
