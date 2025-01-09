import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

const AvatarUser = (): JSX.Element => {
    // Quand un user se connecte, il faut que la premiere lettre de son nom apparaisse dans l'avatar
    const name = 'lucille';
    console.log(name.charAt(0).toUpperCase());
    const nameAvatar = name.charAt(0).toUpperCase();

    return (
        <Avatar className="border-2 rounded-full w-10 h-10 flex items-center justify-center">
            <AvatarFallback>{nameAvatar}</AvatarFallback>
        </Avatar>
    );
};

export default AvatarUser;
