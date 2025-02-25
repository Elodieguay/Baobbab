import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import SelectCityForm from '@/components/form/courses/SelectCityForm';
import yogaHome from '../../assets/images/yogaHome.jpg';
import guitare from '../../assets/images/guitare.jpg';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/footer/Footer';
import Description from './Description';
import CTA from '@/components/home/CTA';
import Navbar from '@/components/navbar.tsx/Navbar';

const Home = (): JSX.Element => {
    const [__, setSelectedCity] = useState<string>('');
    const navigate = useNavigate();
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const { t } = useTranslation('common', {
        keyPrefix: 'Home',
    });

    const form = useForm<z.infer<typeof citySchema>>({
        resolver: zodResolver(citySchema),
        mode: 'onChange',
        defaultValues: {
            city: '',
        },
    });
    const images = [yogaHome, guitare];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBackgroundIndex(
                (prevIndex) => (prevIndex + 1) % images.length
            );
        }, 8000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    const onSubmit = (data: z.infer<typeof citySchema>): void => {
        setSelectedCity(data.city);
        navigate(`/courses/${data.city}`);
    };

    return (
        <div className="w-full  min-h-screen flex flex-col">
            <Navbar />
            <div
                className="w-full h-[40rem] xl:h-[50rem] relative overflow-hidden"
                style={{
                    backgroundImage: `url(${images[currentBackgroundIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.5s ease-in-out',
                }}
            >
                <div className="flex-grow-1 flex-col h-full bg-black bg-opacity-50  ">
                    <div className="h-full flex flex-col items-center justify-end pb-8 gap-5 ">
                        <h1 className="font-poppins text-white font-semibold">
                            {t('baseline')}
                        </h1>
                        {/* <h2 className="font-poppins text-white font-semibold">Des activités pour tous les goûts, à deux pas de chez toi </h2> */}
                        <div className="w-full flex h-14 bottom-0">
                            <SelectCityForm form={form} onSubmit={onSubmit}>
                                <Button
                                    type="submit"
                                    className="h-full bg-[#01a274] rounded-none text-white text-base"
                                    variant="ghost"
                                >
                                    {t('button')}
                                </Button>
                            </SelectCityForm>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-grow">
                <div className="h-[80vh] flex items-center justify-center bg-gray-100">
                    <Description />
                </div>
                <div className="h-[35vh] flex items-center justify-center bg-gray-200">
                    <CTA />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
