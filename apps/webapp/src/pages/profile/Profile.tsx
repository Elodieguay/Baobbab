import AvatarUser from '@/components/auth/AvatarUser';
import TableProfile from '@/components/tables/TableProfile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/Auth.context';
import { AtSign, CircleUser, Smartphone } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = (): JSX.Element => {
    console.log('je suis dans Profile');

    const { authToken, removeAuthToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
        if (!authToken) {
            navigate('/login'); // Redirection avec navigate
        }
    }, [authToken, navigate]);

    // Si l'utilisateur n'est pas connecté, affiche un message
    if (!authToken) {
        return <div>Vous devez être connecté pour accéder à cette page</div>;
    }

    return (
        <div className="h-full bg-home-svg lg:h-screen max-lg:w-[90%] flex flex-col items-center gap-10 ">
            <nav className="relative flex flex-col lg:h-1/5 container mt-5  rounded-xl justify-center items-center text-2xl font-semibold shadow-md bg-white ">
                <header className="flex absolute z-10 bottom-8  w-full  justify-center">
                    {/* <h1 className='border-b'>Bonjour {infos?.username}</h1> */}
                    {infos ? (
                        <AvatarUser
                            name={infos.username}
                            className="w-20 h-20 pointer-events-none border-[#01a274]"
                        />
                    ) : null}
                </header>
                <aside className="flex h-full w-full justify-between items-end ">
                    <Button
                        className="p-4 px-6 bg-[#01a274] text-white"
                        variant={'default'}
                    >
                        Choisir un cours
                    </Button>
                    <Button
                        className=" p-4 px-6 bg-[#01a274] text-white"
                        variant={'default'}
                        onClick={removeAuthToken}
                    >
                        Se déconnecter
                    </Button>
                </aside>
            </nav>
            <section className="h-full container flex justify-center gap-10 ">
                <aside className="flex flex-col lg:w-1/4 lg:h-1/2 bg-white items-center rounded-xl shadow-md ">
                    <div className="flex flex-col w-full h-10 bg-[#01a274] rounded-b-3xl rounded-t-xl justify-center">
                        <h2 className="text-center text-white font-semibold">
                            Mes informations
                        </h2>
                    </div>
                    <ul className="w-full justify-center items-center p-5">
                        <li className="flex border-b lg:h-10 items-center">
                            <CircleUser className="text-gray-800" />
                            <span className="text-right ml-5">
                                {infos?.username}
                            </span>
                        </li>
                        <li className="flex border-b lg:h-10 items-center">
                            <Smartphone className="text-gray-800" />
                            <span className="text-right ml-5">
                                {infos?.username}
                            </span>
                        </li>
                        <li className="flex border-b lg:h-10 items-center">
                            <AtSign className="text-gray-800" />
                            <span className="text-center ml-5">
                                {infos?.email}
                            </span>
                        </li>
                    </ul>
                </aside>
                <div className="flex flex-col lg:h-4/5 lg:w-3/4 bg-white items-center rounded-xl shadow-md">
                    <div className="flex flex-col w-full h-10 bg-[#01a274] rounded-b-3xl rounded-t-xl justify-center">
                        <h2 className="text-center text-white font-semibold">
                            Informations sur tes cours d'essai
                        </h2>
                    </div>
                    <div className="w-full h-auto overflow-auto p-4">
                        <TableProfile />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
