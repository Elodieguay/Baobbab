import {
    forgottenPasswordSchema,
    forgottenPasswordSchemaType,
} from '@baobbab/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useForgotPassword } from '@/hooks/auth/query';
import { Trans } from 'react-i18next';
import log from 'loglevel';
import { useNavigate } from 'react-router';

const ForgottenPassword = () => {
    const { mutate: forgotPassword } = useForgotPassword();
    const navigate = useNavigate();
    const form = useForm<forgottenPasswordSchemaType>({
        resolver: zodResolver(forgottenPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });
    const onSubmitForm = (values: forgottenPasswordSchemaType) => {
        log.debug('emailSubmit:', values.email);
        forgotPassword(
            {
                email: values.email,
            },
            {
                onSuccess: (data: { token: string }) => {
                    const token = data.token;
                    if (token) {
                        navigate(`/resetPassword/${token}`);
                    }
                },
            }
        );
    };

    log.debug('values:', form.getValues('email'));
    return (
        <div className="w-full h-screen bg-[#cb8501]  flex flex-col items-center justify-around">
            <div className=" w-1/2 h-1/2 rounded-3xl flex flex-col justify-around items-center gap-8 ">
                <h1 className=" font-semibold font-poppins">
                    <Trans
                        i18nKey="Navbar.logo"
                        components={{
                            span: <span className="text-[#01a274]" />,
                        }}
                    />
                </h1>
                <h2>Oups, vous avez oublié votre mot de passe</h2>
                <h3 className="flex text-center">
                    On va arranger ça! <br /> on vous envoie un email pour
                    réinitialiser votre mot de passe{' '}
                </h3>
                <div className="w-1/2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmitForm)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="email"
                                                value={field.value ?? ''}
                                            />
                                        </FormControl>{' '}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]"
                            >
                                Envoyer
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ForgottenPassword;
