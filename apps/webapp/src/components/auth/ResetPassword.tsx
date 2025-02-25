import { useNavigate, useParams } from 'react-router';
import { resetPasswordSchema, resetPasswordSchemaType } from '@baobbab/dtos';
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
import { Trans } from 'react-i18next';
import { Input } from '../ui/input';
import log from 'loglevel';
import { useResetPassword } from '@/hooks/auth/useAuthMutation';

const ResetPassword = (): JSX.Element => {
    const { token } = useParams(); // Récupère le token depuis l'URL
    const navigate = useNavigate();

    const { mutate: resetPassword } = useResetPassword(token ?? '');

    const form = useForm<resetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            password: '',
        },
    });

    const onSubmitForm = (values: resetPasswordSchemaType) => {
        log.debug('passwordSubmit:', values.password);
        resetPassword(
            {
                password: values.password,
            },
            {
                onSuccess: () => {
                    navigate(`/courses`);
                },
            }
        );
    };
    if (!token) {
        return <div>Invalid token</div>;
    }
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
                <h2>Changeons de mot passe</h2>
                <div className="w-1/2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmitForm)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="mot de passe"
                                                value={field.value ?? ''}
                                            />
                                        </FormControl>
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

export default ResetPassword;
