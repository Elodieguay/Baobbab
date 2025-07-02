import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/inputPassword';
import {
    OrganisationLoginDTO,
    organisationLoginFormSchema,
    UserRole,
} from '@baobbab/dtos';
import log from 'loglevel';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const OrganisationFormLogin = ({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof organisationLoginFormSchema>>;
    onSubmit: (organisationLogin: OrganisationLoginDTO) => void;
}): JSX.Element => {
    function onSubmitForm(
        values: z.infer<typeof organisationLoginFormSchema>
    ): void {
        onSubmit({
            role: UserRole.ADMIN,
            email: values.email,
            password: values.password,
        });
        log.error('Erreur de soumission du formulaire');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-6 w-full flex flex-col"
            >
                <h1 className="font-semibold text-lg">Vos identifiants</h1>
                <div className="grid grid-cols-1 gap-6">
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
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputPassword
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
                </div>
                <Button
                    type="submit"
                    className="w-1/2 bg-[#fdcf63] rounded-xl hover:bg-[#be3565]"
                >
                    Se connecter
                </Button>
            </form>
        </Form>
    );
};

export default OrganisationFormLogin;
