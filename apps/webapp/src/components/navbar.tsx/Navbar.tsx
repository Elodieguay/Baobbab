import { Smile } from 'lucide-react';
import Modal from '../auth/ModalAuth';
import NavbarMenu from './NavbarMenu';
import { useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Link } from 'react-router';
import { Button } from '../ui/button';

const Navbar = (): JSX.Element => {
    const { authToken, removeAuthToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = (): void => {
        setMenuOpen(true);
    };

    return (
        <div className="w-full h-24 bg-[#0b927a] flex justify-around items-center text-white">
            <h1 className="text-2xl font-semibold">Baobbab</h1>
            <div>
                <NavbarMenu />
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
                                    {' '}
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
    );
};

export default Navbar;
