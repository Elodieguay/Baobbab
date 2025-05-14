import Navbar from '@/components/navbar.tsx/Navbar';
import OrganisationFormRegister from '@/components/form/auth/OrganisationFormRegister';
import { useForm } from 'react-hook-form';
import {
    organisationLoginFormSchema,
    organisationRegisterFormSchema,
    UserRole,
} from '@baobbab/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    useOrganisationLogin,
    useOrganisationRegister,
} from '@/hooks/auth/useAuthMutation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import OrganisationFormLogin from '@/components/form/auth/OrganisationFormLogin';
import Footer from '@/components/footer/Footer';
import meditation from '@/assets/meditationProf.jpg';

const Organisation = (): JSX.Element => {
    const { mutate: organisationRegister } = useOrganisationRegister();

    const { mutate: organisationLogin } = useOrganisationLogin();
    const { t } = useTranslation('common', {
        keyPrefix: 'Organisation.page',
    });

    const formRegister = useForm<
        z.infer<typeof organisationRegisterFormSchema>
    >({
        resolver: zodResolver(organisationRegisterFormSchema),
        mode: 'onChange',
        defaultValues: {
            organisationName: '',
            siret: undefined,
            email: '',
            password: '',
        },
    });

    const formLogin = useForm<z.infer<typeof organisationLoginFormSchema>>({
        resolver: zodResolver(organisationLoginFormSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmitForm = (
        values: z.infer<typeof organisationRegisterFormSchema>
    ): void => {
        organisationRegister(values);
    };

    const onSubmitLoginForm = (
        values: z.infer<typeof organisationLoginFormSchema>
    ): void => {
        organisationLogin({
            ...values,
            role: UserRole.ADMIN,
        });
    };
    // useEffect(() => {
    //     if (authToken && role === UserRole.ADMIN) {
    //         navigate('/dashboard');
    //     }
    // }, [authToken, role]);

    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center px-4 pt-10 space-y-10">
                <h2 className="text-center w-full max-w-3xl text-base md:text-lg">
                    {t('registerContent')}
                </h2>

                <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl gap-6 xl:gap-10 justify-center items-center">
                    {/* Bloc Formulaires */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <Tabs
                            defaultValue="register"
                            className="w-full max-w-md"
                        >
                            <TabsList className="grid w-full grid-cols-2 gap-2">
                                <TabsTrigger value="register">
                                    {t('register')}
                                </TabsTrigger>
                                <TabsTrigger value="login">
                                    {t('login')}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="register"
                                className="flex justify-center"
                            >
                                <div className="w-full p-4 md:p-6 rounded-md">
                                    <OrganisationFormRegister
                                        form={formRegister}
                                        onSubmit={onSubmitForm}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="login"
                                className="flex justify-center"
                            >
                                <div className="w-full p-4 md:p-6 rounded-md">
                                    <OrganisationFormLogin
                                        form={formLogin}
                                        onSubmit={onSubmitLoginForm}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Bloc Image */}
                    <div className="w-full lg:w-1/2 rounded-md overflow-hidden">
                        <img
                            src={meditation}
                            alt="méditation"
                            className="w-full h-64 md:h-96 lg:h-full object-cover rounded-md"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Organisation;
{
    /* <div className="h-full font-semibold space-y-4 justify-around font-poppins mb-6  ">
                        <p className="flex gap-4 text-sm">
                            <Sparkles className="w-10 h-10 text-[#be3565]" />
                            Gagnez en visibilité auprès de ceux qui cherchent à
                            s’épanouir près de chez eux.
                        </p>
                        <p className="flex gap-4 text-sm">
                            <SmilePlus className="w-10 h-10 text-[#be3565]" />
                            Attirez de nouveaux adhérents en rendant vos cours
                            accessibles en quelques clics.
                        </p>
                        <p className="flex gap-4 text-sm">
                            <HeartHandshake className="w-10 h-10 text-[#be3565]" />{' '}
                            Faites partie d’un réseau engagé qui dynamise la vie
                            locale et favorise le partage.
                        </p>
                    </div> */
}
