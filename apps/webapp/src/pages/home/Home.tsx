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
        <div className="w-full h-screen bg-home-img bg-opacity-80 flex flex-col m-0">
            <div className="flex items-center justify-between p-4 container mx-auto">
                <h1 className="text-5xl text-gray-600 font-sketch">Baobbab</h1>
                <h2 className="text-base text-gray-600 font-poppins">
                    Se connecter
                </h2>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow container mx-auto">
                <p className="text-2xl text-gray-600 font-poppins mb-4">
                    Trouve ton activité à proximité
                </p>
                <SelectCityForm form={form} onSubmit={onSubmit} />
            </div>
        </div>
    );
};

export default Home;
