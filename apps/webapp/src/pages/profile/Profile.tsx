import Navbar from '@/components/navbar.tsx/Navbar';
import TableProfile from '@/components/tables/TableProfile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/Auth.context';
import { CircleUser, Smartphone } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = (): JSX.Element => {
    const { authToken, removeAuthData, username } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
    }, [authToken, navigate]);

    if (!authToken) {
        return <div>Vous devez être connecté pour accéder à cette page</div>;
    }

    return (
        <div className="h-full bg-home-svg lg:h-screen max-lg:w-[90%] lg:overflow-hidden">
            <Navbar />
            <div className="flex flex-col h-full  items-center gap-10 bg-white">
                <nav className="relative flex flex-col lg:h-1/5 container mt-5  rounded-xl justify-center items-center lg:text-2xl font-semibold shadow-md bg-white ">
                    <header className="flex absolute z-10 bottom-8  w-full  justify-center">
                        <h1 className="">Bonjour {username}</h1>
                        {/* {username ? (
                        <AvatarUser
                            name={username}
                            className="w-20 h-20 pointer-events-none border-[#01a274]"
                        />
                    ) : null} */}
                    </header>
                    <aside className="flex h-full w-full justify-between items-end ">
                        <Button
                            className="lg:p-4 lg:px-6 bg-[#01a274] text-white max-md:h-8"
                            variant={'default'}
                        >
                            Choisir un cours
                        </Button>
                        <Button
                            className=" lg:p-4 lg:px-6 bg-[#01a274] text-white max-md:h-8"
                            variant={'default'}
                            onClick={removeAuthData}
                        >
                            Se déconnecter
                        </Button>
                    </aside>
                </nav>
                <section className="h-full container max-md:flex-col flex justify-center gap-10 ">
                    <aside className="flex flex-col lg:w-1/4 lg:h-1/2 bg-white items-center rounded-xl shadow-md ">
                        <div className="flex flex-col w-full h-10 bg-[#01a274] justify-center">
                            <h2 className="text-center text-white font-semibold">
                                Mes informations
                            </h2>
                        </div>
                        <ul className="w-full justify-center items-center p-5">
                            <li className="flex border-b lg:h-10 items-center">
                                <CircleUser className="text-gray-800" />
                                <span className="text-right ml-5">
                                    {username}
                                </span>
                            </li>
                            <li className="flex border-b lg:h-10 items-center">
                                <Smartphone className="text-gray-800" />
                                <span className="text-right ml-5">
                                    {username}
                                </span>
                            </li>
                            {/* <li className="flex border-b lg:h-10 items-center">
                            <AtSign className="text-gray-800" />
                            <span className="text-center ml-5">
                                {email}
                            </span>
                        </li> */}
                        </ul>
                    </aside>
                    <div className="flex flex-col lg:h-4/5 lg:w-3/4 bg-white items-center rounded-xl shadow-md">
                        <div className="flex flex-col w-full h-10 bg-[#01a274] justify-center">
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
        </div>
    );
};

export default Profile;
