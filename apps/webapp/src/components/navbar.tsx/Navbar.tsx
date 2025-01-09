import { Building2, House, Smile } from 'lucide-react';
import Modal from '../auth/ModalAuth';
import NavbarMenu from './NavbarMenu';
import { useState } from 'react';
import { useAuth } from '@/context/Auth.context';
import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { useCity } from '@/context/City.context';
import SelectCityForm from '../form/SelectCityForm';
import { useForm } from 'react-hook-form';
import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AvatarUser from '../auth/AvatarUser';

const Navbar = (): JSX.Element => {
    const navigate = useNavigate();
    const { city } = useCity();
    const { authToken, removeAuthToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<string>('');

    const toggleMenu = (): void => {
        setMenuOpen(true);
    };

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
        <div className="w-full flex flex-col ">
            <div className="w-full  flex items-center justify-between border-b px-8">
                <h1 className="text-3xl font-semibold font-poppins">Baobbab</h1>
                <AvatarUser />
                <div className="w-1/4 flex justify-around items-center rounded-3xl border gap-2">
                    <div className="flex w-1/3 gap-3 pl-5">
                        {/* <House /> */}
                        <Building2 />
                        {city}
                    </div>
                    <div className="w-2/3 ">
                        <SelectCityForm form={form} onSubmit={onSubmit}>
                            <Button
                                className=" rounded-l-none bg-[#94c0af] text-white"
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
