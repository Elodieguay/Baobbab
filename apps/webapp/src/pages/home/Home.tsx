import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import SelectCityForm from '@/components/form/SelectCityForm';
import { UserRound } from 'lucide-react';
import yogaHome from '../../assets/images/yogaHome.jpg';
import guitare from '../../assets/images/guitare.jpg';
import chorale from '../../assets/images/chorale.jpg';
import boxeHome from '../../assets/images/boxeHome.jpg';
import cuisine from '../../assets/images/cuisine.png';

const Home = (): JSX.Element => {
    const [selectedCity, setSelectedCity] = useState<string>('');
    const navigate = useNavigate();
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    const form = useForm<z.infer<typeof citySchema>>({
        resolver: zodResolver(citySchema),
        mode: 'onChange',
        defaultValues: {
            city: '',
        },
    });
    const images = [yogaHome, guitare, cuisine];

    // Changer l'image automatiquement toutes les 5 secondes
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBackgroundIndex(
                (prevIndex) => (prevIndex + 1) % images.length
            );
        }, 8000);

        // Nettoyer l'intervalle lorsqu'on quitte le composant
        return () => clearInterval(intervalId);
    }, []);
    const onSubmit = (data: z.infer<typeof citySchema>): void => {
        setSelectedCity(data.city);
        navigate(`/courses/${data.city}`);
    };

    console.log('selectedCity', selectedCity);

    return (
        <div
            className="w-full h-screen relative"
            style={{
                backgroundImage: `url(${images[currentBackgroundIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out',
            }}
        >
            <div className="flex flex-col h-full bg-black bg-opacity-50">
                <div className="flex items-center justify-between font-semibold px-8 py-4 ">
                    <h1 className="text-3xl font-semibold text-white font-poppins">
                        Baobbab
                    </h1>
                    <p className="flex flex-col items-center text-white">
                        <UserRound />
                        connection
                    </p>
                </div>
                <div className="h-full flex flex-col items-center justify-center flex-grow gap-5 ">
                    <p className="text-xl font-poppins text-white">
                        Trouve ton activité à proximité
                    </p>
                    <div className="w-full flex ">
                        <SelectCityForm form={form} onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
