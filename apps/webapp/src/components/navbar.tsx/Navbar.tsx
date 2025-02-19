import { Building2 } from 'lucide-react';
import Modal from '../auth/ModalAuth';
import NavbarMenu from './NavbarMenu';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { useCity } from '@/context/City.context';
import { useForm } from 'react-hook-form';
import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AvatarUser from '../auth/AvatarUser';
import { Trans, useTranslation } from 'react-i18next';
import SelectCityForm from '../form/courses/SelectCityForm';

const Navbar = (): JSX.Element => {
    const navigate = useNavigate();
    const { city } = useCity();
    const { authToken, removeAuthToken, infos } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [_, setSelectedCity] = useState<string>('');
    const { t } = useTranslation('common', {
        keyPrefix: 'Navbar',
    });

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
    const form = useForm<z.infer<typeof citySchema>>({
        resolver: zodResolver(citySchema),
        mode: 'onChange',
        defaultValues: {
            city: '',
        },
    });

    const onSubmit = (data: z.infer<typeof citySchema>): void => {
        setSelectedCity(data.city);
        navigate(`/courses/${data.city}`);
    };

    return (
        <div className="w-full flex flex-col bg-center">
            <div className="w-full h-16 flex items-center justify-between border-b px-8">
                <h1 className="text-3xl font-semibold font-poppins">
                    <Trans
                        i18nKey="Navbar.logo"
                        components={{
                            span: <span className="text-[#01a274]" />,
                        }}
                    />
                </h1>
                <div className="w-1/3 flex justify-around items-center rounded-3xl border-2 gap-2">
                    <div className="flex w-1/3 gap-3 pl-5">
                        <Building2 className="text-[#be3565]" />
                        {city}
                    </div>
                    <div className="w-2/3 border-l ">
                        <SelectCityForm form={form} onSubmit={onSubmit}>
                            <Button
                                className=" rounded-l-none bg-[#01a274] text-white"
                                variant="ghost"
                            >
                                Allez
                            </Button>
                        </SelectCityForm>
                    </div>
                </div>
                <div>
                    {authToken ? (
                        <div className="relative">
                            <AvatarUser
                                name={infos?.username ?? null}
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
                                        onClick={removeAuthToken}
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
            <div className="h-16 flex justify-center border-b">
                <NavbarMenu />
            </div>
        </div>
    );
};

export default Navbar;
