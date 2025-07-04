import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import {
    OrganisationRegisterDTO,
    organisationRegisterFormSchema,
} from '@baobbab/dtos';
import log from 'loglevel';
import { InputPassword } from '@/components/ui/inputPassword';

const OrganisationFormRegister = ({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof organisationRegisterFormSchema>>;
    onSubmit: (organisationRegister: OrganisationRegisterDTO) => void;
}): JSX.Element => {
    function onSubmitForm(
        values: z.infer<typeof organisationRegisterFormSchema>
    ): void {
        onSubmit({
            organisationName: values.organisationName,
            siret: values.siret,
            email: values.email,
            password: values.password,
        });
        log.warn(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-6 w-full flex flex-col"
            >
                <h1 className="font-semibold text-lg">Votre établissement</h1>
                <div className="grid grid-cols-1 gap-6">
                    <FormField
                        control={form.control}
                        name="organisationName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Nom de votre établissement"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="siret"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="siret"
                                        className="w-full"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                    // onClick={() => }
                    className="w-1/2 bg-[#fdcf63] rounded-xl hover:bg-[#be3565]"
                >
                    S'enregistrer
                </Button>
            </form>
        </Form>
    );
};

export default OrganisationFormRegister;
