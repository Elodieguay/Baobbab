import Navbar from '@/components/navbar.tsx/Navbar';
import OrganisationFormRegister from '@/components/form/auth/OrganisationFormRegister';
import { useForm } from 'react-hook-form';
import {
    organisationFormSchema,
    OrganisationRegisterDTO,
    organisationRegisterFormSchema,
    Status,
    UserRole,
} from '@baobbab/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { HeartHandshake, SmilePlus, Sparkles } from 'lucide-react';
// import bubble from '@/assets/bubble.png';
// import TestImageFile from '@/components/form/TestImageFile';
import { useOrganisationRegister } from '@/hooks/useAuthMutation';

const Organisation = (): JSX.Element => {
    const { mutate: organisationRegister, isPending } =
        useOrganisationRegister();

    const form = useForm<z.infer<typeof organisationRegisterFormSchema>>({
        resolver: zodResolver(organisationRegisterFormSchema),
        mode: 'onChange',
        defaultValues: {
            organisationName: '',
            siret: 0,
            email: '',
            password: '',
        },
    });

    const onSubmitForm = (
        values: z.infer<typeof organisationRegisterFormSchema>
    ): void => {
        console.log(values);
        console.log('je suis là');

        organisationRegister({
            ...values,
            role: UserRole.ADMIN,
            status: Status.PENDING,
        });
    };

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="flex h-screen  items-center gap-4">
                <div className="flex flex-col w-1/2 items-center gap-4">
                    <div className="flex flex-col gap-4 text-lg items-center">
                        <h1 className="text-center">
                            Faites rayonner votre passion auprès d’une
                            communauté en quête de nouvelles expériences !
                        </h1>
                        <p className="text-xl font-semibold">
                            Créer votre compte
                        </p>
                    </div>
                    <div className="w-3/4 p-6 rounded-md ">
                        <OrganisationFormRegister
                            form={form}
                            onSubmit={onSubmitForm}
                        />
                    </div>
                </div>
                <div className="w-1/2 h-full bg-registerOrga bg-cover flex flex-col  justify-center items-center ">
                    {/* <div className="h-full font-semibold space-y-4 justify-around font-poppins mb-6  ">
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Organisation;
