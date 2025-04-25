import { Building2 } from 'lucide-react';
import SelectCityForm from '../form/courses/SelectCityForm';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useCity } from '@/context/City.context';

const NavbarCitySelection = () => {
    const navigate = useNavigate();

    const [__, setSelectedCity] = useState<string>('');
    const { city } = useCity();

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
        <div className="w-full flex justify-around items-center rounded-3xl border gap-2">
            <div className="flex w-1/3 gap-3 pl-5 p-2">
                <Building2 className="text-[#be3565]" />
                {city}
            </div>
            <div className="w-2/3 border-l ">
                <SelectCityForm form={form} onSubmit={onSubmit}>
                    <Button
                        className="h-full rounded-l-none bg-[#01a274] text-white"
                        variant="ghost"
                    >
                        Allez
                    </Button>
                </SelectCityForm>
            </div>
        </div>
    );
};

export default NavbarCitySelection;
