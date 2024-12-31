import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import SelectCityForm from '@/components/form/SelectCityForm';

const Home = (): JSX.Element => {
    const [selectedCity, setSelectedCity] = useState<string>('');
    const navigate = useNavigate();

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

    console.log('selectedCity', selectedCity);

    return (
        <div className="w-full h-screen flex justify-center  ">
            <div className="w-2/3 bg-home-img bg-opacity-90   flex flex-col gap-8 justify-center items-center font-semibold">
                <h1 className="text-8xl text-gray-600 font-sketch ">Baobbab</h1>
                <p className="text-2xl text-gray-600 font-poppins">
                    Trouve ton activité à proximité
                </p>
            </div>
            <div className="flex w-1/3  bg-[#5ac1a5]    ">
                <div className="w-full flex ">
                    {/* <MapPin size={40} /> */}
                    <SelectCityForm form={form} onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Home;
