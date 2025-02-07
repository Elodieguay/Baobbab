import { cn } from '@/utils/utils';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

export type AvatarUserProps = {
    name: string | null;
    onClick?: () => void;
    className?: string;
};
const AvatarUser = ({
    name,
    onClick,
    className,
}: AvatarUserProps): JSX.Element => {
    let nameAvatar = '';
    if (name) {
        nameAvatar = name.charAt(0).toUpperCase();
    }

    return (
        <Avatar
            className={cn(
                'border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            <AvatarFallback>{nameAvatar}</AvatarFallback>
        </Avatar>
    );
};

export default AvatarUser;
