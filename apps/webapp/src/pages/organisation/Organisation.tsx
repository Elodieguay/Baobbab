import Navbar from '@/components/navbar.tsx/Navbar';
import OrganisationFormRegister from '@/components/form/auth/OrganisationFormRegister';
import { useForm } from 'react-hook-form';
import {
    organisationLoginFormSchema,
    organisationRegisterFormSchema,
    Status,
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
        <div className="w-full h-full">
            <Navbar />
            <div className="flex flex-col h-screen w-full items-center space-y-10 overflow-hidden">
                <h2 className="text-center w-2/3 pt-5">
                    {t('registerContent')}
                </h2>
                <div className="flex w-[90%]  min-h-screen xl:gap-8 justify-center ">
                    <div className="flex w-1/2 h-5/6 justify-center items-center">
                        <Tabs defaultValue="register" className="w-4/5">
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
                                <div className="w-3/4 p-6 rounded-md ">
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
                                <div className="w-3/4 p-6 rounded-md ">
                                    <OrganisationFormLogin
                                        form={formLogin}
                                        onSubmit={onSubmitLoginForm}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="w-1/2 h-5/6 justify-center items-center rounded-md overflow-hidden">
                        <img
                            src={meditation}
                            className="h-full w-full object-cover rounded-t-md"
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
