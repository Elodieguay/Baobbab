import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import SelectCityForm from '@/components/form/courses/SelectCityForm';
import { UserRound } from 'lucide-react';
import yogaHome from '../../assets/images/yogaHome.jpg';
import guitare from '../../assets/images/guitare.jpg';
import cuisine from '../../assets/images/cuisine.png';
import { Button } from '@/components/ui/button';
import { Trans, useTranslation } from 'react-i18next';

const Home = (): JSX.Element => {
    const [_, setSelectedCity] = useState<string>('');
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
    }, []);

    const onSubmit = (data: z.infer<typeof citySchema>): void => {
        setSelectedCity(data.city);
        navigate(`/courses/${data.city}`);
    };

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
                        <Trans
                            i18nKey="Home.logo"
                            components={{
                                span: <span className="text-[#01a274]" />,
                            }}
                        />
                    </h1>
                    <p className="flex flex-col items-center text-white">
                        <UserRound />
                        {t('connect')}
                    </p>
                </div>
                <div className="h-full flex flex-col items-center justify-center flex-grow gap-5 ">
                    <p className="text-xl font-poppins text-white font-semibold">
                        {t('baseline')}
                    </p>
                    <div className="w-full flex h-14">
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
    );
};

export default Home;
