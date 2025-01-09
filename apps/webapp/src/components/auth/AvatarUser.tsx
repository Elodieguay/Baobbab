import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

export type AvatarUserProps = {
    name: string | null;
    onClick: () => void;
};
const AvatarUser = ({ name, onClick }: AvatarUserProps): JSX.Element => {
    // Quand un user se connecte, il faut que la premiere lettre de son nom apparaisse dans l'avatar
    console.log('name', name);

    let nameAvatar = '';
    if (name) {
        nameAvatar = name.charAt(0).toUpperCase();
    }

    return (
        <Avatar
            className="border-2 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={onClick}
        >
            <AvatarFallback>{nameAvatar}</AvatarFallback>
        </Avatar>
    );
};

export default AvatarUser;
