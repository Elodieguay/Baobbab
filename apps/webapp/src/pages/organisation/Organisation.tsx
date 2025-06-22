import Navbar from '@/components/navbar/Navbar';
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
} from '@/hooks/auth/query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import OrganisationFormLogin from '@/components/form/auth/OrganisationFormLogin';
import Footer from '@/components/footer/Footer';
import meditation from '@/assets/images/meditationProf.jpg';

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
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <Tabs
                            defaultValue="register"
                            className="w-full max-w-md "
                        >
                            <TabsList className="grid w-full grid-cols-2 gap-2">
                                <TabsTrigger value="register">
                                    {t('register')}
                                </TabsTrigger>
                                <TabsTrigger value="login">
                                    {t('login')}
                                </TabsTrigger>
                            </TabsList>
                            <div className="relative min-h-[30rem] w-full">
                                <TabsContent
                                    value="register"
                                    className="flex justify-center"
                                >
                                    <div className="w-full flex flex-1 p-4 md:p-6 rounded-md">
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
                                    <div className="w-full flex flex-1 p-4 md:p-6 rounded-md">
                                        <OrganisationFormLogin
                                            form={formLogin}
                                            onSubmit={onSubmitLoginForm}
                                        />
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

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
