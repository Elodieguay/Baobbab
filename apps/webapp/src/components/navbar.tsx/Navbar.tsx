import { Building2, House, Smile } from 'lucide-react';
import Modal from '../auth/ModalAuth';
import NavbarMenu from './NavbarMenu';
import { useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Link } from 'react-router';
import { Button } from '../ui/button';

const Navbar = ({ city }: { city: string }): JSX.Element => {
    const { authToken, removeAuthToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = (): void => {
        setMenuOpen(true);
    };

    return (
        <div className="w-full flex flex-col ">
            <div className="w-full h-16 flex items-center justify-between border-b px-8">
                <h1 className="text-3xl font-semibold font-poppins">Baobbab</h1>
                <div className="w-1/4 p-2 flex justify-center rounded-3xl border gap-2">
                    {/* <House /> */}
                    <Building2 />
                    {city}
                    <span className="border-l px-2">Changer de ville</span>
                </div>
                <div>
                    {authToken ? (
                        <div className="relative">
                            <Smile onClick={toggleMenu} />
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Mon Profil
                                    </Link>
                                    <Button
                                        onClick={removeAuthToken}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Déconnexion
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Modal />
                    )}
                </div>
            </div>
            <div className="h-16 flex justify-center border-b">
                <NavbarMenu />
            </div>
        </div>
    );
};

export default Navbar;
