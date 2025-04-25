import Navbar from '@/components/navbar.tsx/Navbar';
import guitare from '../../assets/images/guitare.jpg';
import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import SelectCityForm from '@/components/form/courses/SelectCityForm';
import { Button } from '@/components/ui/button';
import { useCity } from '@/context/City.context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Quotes from '@/pages/home/Quotes';
import Description from './Description';
import CTA from '@/components/home/CTA';

const HomePage = () => {
    const navigate = useNavigate();
    const [__, setSelectedCity] = useState<string>('');
    const { setCity } = useCity();
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

    const onSubmit = (data: z.infer<typeof citySchema>): void => {
        setSelectedCity(data.city);
        setCity(data.city);
        navigate(`/courses/${data.city}`);
    };
    return (
        <div className="relative w-full min-h-screen  ">
            <div className="absolute top-0 left-0 w-full z-10">
                <Navbar className="lg:text-white" />
            </div>
            <div className="flex flex-col lg:flex-row w-full h-full xl:mx-40 xl:max-w-[80%] mx-auto">
                <div className="flex flex-col  w-1/2  xl:pl-24 xl:p-20 ml-4 px-5 gap-12 z-20 relative justify-end">
                    <h1 className="text-7xl ">{t('name')}</h1>
                    <p className="text-xl container mx-auto flex flex-col px-8">
                        <span>{t('description')}</span>
                        <span className="">{t('description1')}</span>
                    </p>
                    <p className="text-xl container mx-auto px-8">
                        {t('description2')}
                    </p>
                    <div className="px-8">
                        <SelectCityForm form={form} onSubmit={onSubmit}>
                            <Button
                                type="submit"
                                className="h-full w-1/2 bg-[#be3565] rounded-none text-white text-base"
                                variant="ghost"
                            >
                                {t('button')}
                            </Button>
                        </SelectCityForm>
                    </div>
                </div>
                <div className="w-1/2 h-full rounded-bl-[60px] overflow-hidden  relative">
                    <img
                        src={guitare}
                        alt="guitare"
                        className="w-full h-[80dvh] object-cover"
                    />
                </div>
            </div>
            <div className=" my-20">
                <Quotes />
                <Description />
                <CTA />
            </div>
        </div>
    );
};

export default HomePage;
