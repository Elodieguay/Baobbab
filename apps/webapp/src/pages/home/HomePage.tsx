import Navbar from '@/components/navbar.tsx/Navbar';
import guitare from '@/assets/images/guitare.jpg';
import { citySchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import SelectCityForm from '@/components/form/courses/SelectCityForm';
import { Button } from '@/components/ui/button';
import { useCity } from '@/context/City.context';
import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';
import Quotes from '@/components/home/Quotes';
import Description from '@/components/home/Description';
import CTA from '@/components/home/CTA';
import NotFound from '../notFound/NotFound';

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
        <div className="relative w-full min-h-screen">
            <div className="absolute top-0 left-0 w-full  z-10">
                <Navbar className="lg:text-white  " />
            </div>
            <div className="flex flex-col lg:flex-row w-full h-full max-w-[95rem] mx-auto px-4 md:px-8 xl:px-20">
                <div className="flex flex-col w-full lg:w-1/2 justify-end gap-10 md:gap-12 mt-32 lg:mt-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                        <Trans
                            i18nKey="Home.logo"
                            components={{
                                span: <span className="text-[#01a274]" />,
                            }}
                        />
                    </h1>

                    <p className="text-base md:text-lg lg:text-xl px-2 md:px-4">
                        <span>{t('description')}</span>
                        <br />
                        <span>{t('description1')}</span>
                    </p>

                    <p className="text-base md:text-lg lg:text-xl px-2 md:px-4">
                        {t('description2')}
                    </p>

                    <div className="px-2 md:px-4">
                        <SelectCityForm form={form} onSubmit={onSubmit}>
                            <Button
                                type="submit"
                                className="h-14 px-6 bg-[#be3565] hover:bg-[#a52c54] text-white font-medium text-base rounded-r-md transition-all duration-200"
                            >
                                {t('button')}
                            </Button>
                        </SelectCityForm>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 mt-10 lg:mt-0 rounded-bl-[40px] overflow-hidden relative">
                    <img
                        src={guitare}
                        alt="guitare"
                        className="w-full h-60 xs:h-72 sm:h-[40vh] md:h-[50vh] lg:h-[80vh] object-cover"
                    />
                </div>
            </div>
            <div className="my-20 px-4 md:px-8 xl:px-20">
                <Quotes />
            </div>
            <Description />
            <div className="my-20 px-4 md:px-8 xl:px-20">
                <CTA />
            </div>
        </div>
    );
};

export default HomePage;
