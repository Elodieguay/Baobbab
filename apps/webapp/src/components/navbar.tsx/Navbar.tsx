import Modal from '../auth/ModalAuth';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import AvatarUser from '../auth/AvatarUser';
import { Trans } from 'react-i18next';

const Navbar = (): JSX.Element => {
    const { authToken, removeAuthData, username } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (): void => {
        event?.stopPropagation();
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const closeMenu = (): void => {
            setMenuOpen(false);
        };

        if (menuOpen) {
            document.addEventListener('click', closeMenu);
        }
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [menuOpen]);

    return (
        <div className="w-full flex flex-col justify-center items-center border-b">
            <div className="xl:w-2/3 w-full h-16 flex items-center justify-between  px-8">
                <h1 className="text-3xl font-semibold font-poppins">
                    <Trans
                        i18nKey="Navbar.logo"
                        components={{
                            span: <span className="text-[#01a274]" />,
                        }}
                    />
                </h1>
                {/* <NavbarCitySelection/> */}
                <div>
                    {authToken ? (
                        <div className="relative">
                            <AvatarUser
                                name={username ?? null}
                                onClick={toggleMenu}
                            />
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-20">
                                    <Link
                                        to="/profile"
                                        className=" block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-center"
                                    >
                                        Mon Profile
                                    </Link>
                                    <Button
                                        onClick={removeAuthData}
                                        className="block text-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-base"
                                        variant="ghost"
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
        </div>
    );
};

export default Navbar;
