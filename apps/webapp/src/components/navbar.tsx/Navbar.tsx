import Modal from '../auth/ModalAuth';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import AvatarUser from '../auth/AvatarUser';
import { Trans, useTranslation } from 'react-i18next';
import { UserRole } from '@baobbab/dtos';
import { cn } from '@/utils/utils';

const Navbar = ({ className }: { className?: string }): JSX.Element => {
    const { authToken, removeAuthData, username, role, entityId } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation('common', {
        keyPrefix: 'Navbar',
    });

    const toggleMenu = (): void => {
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
        <div className="w-full flex justify-center border-none">
            <div className="w-full max-w-7xl h-16 flex items-center justify-between px-4 md:px-8 xl:px-2">
                <Link to="/">
                    <h1 className="text-3xl font-semibold font-poppins">
                        <Trans
                            i18nKey="Navbar.logob"
                            components={{
                                span: (
                                    <span className="text-[#01a274] text-5xl" />
                                ),
                            }}
                        />
                    </h1>
                </Link>
                <div className={cn('mt-5', className)}>
                    {authToken ? (
                        <div className="relative">
                            <AvatarUser
                                name={username ?? null}
                                onClick={toggleMenu}
                            />
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-20">
                                    {role === UserRole.USER ? (
                                        <Link
                                            to="/profile"
                                            className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-center"
                                        >
                                            {t('menuProfile')}
                                        </Link>
                                    ) : role === UserRole.ADMIN ? (
                                        <Link
                                            to={`/dashboard/${entityId}`}
                                            className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-center"
                                        >
                                            {t('menuDashboard')}
                                        </Link>
                                    ) : null}

                                    <Button
                                        onClick={removeAuthData}
                                        className="block text-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-base"
                                        variant="ghost"
                                    >
                                        {t('menuDisconnect')}
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
