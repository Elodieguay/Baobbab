import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema, UserRegisterDTO, UserRole } from '@baobbab/dtos';
import { Checkbox } from '@/components/ui/checkbox';

export default function Register({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    onSubmit: (userRegister: UserRegisterDTO) => void;
}): JSX.Element {
    function onSubmitForm(values: z.infer<typeof formSchema>): void {
        //eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSubmit({
            username: values.username || '',
            email: values.email,
            password: values.password,
            role: UserRole.USER,
            created_at: new Date(),
        }),
            console.warn(values);
    }
    console.log('all values', form.getValues());

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="prénom"
                                />
                            </FormControl>
                            <FormDescription>
                                Il doit contenir au moins 4 caractères.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormDescription>
                                Saisis l'adresse e-mail que tu souhaites
                                utiliser sur baobbab.
                            </FormDescription>
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
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="mot de passe"
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormDescription>
                                Il doit contenir au moins 8 caractères, dont 1
                                chiffre et 1 majuscule.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-5">
                    <Checkbox className="h-6 w-6 border-slate-700 data-[state=checked]:bg-[#0b927a] rounded-md" />
                    <p>
                        En t'inscrivant, tu confirmes que tu acceptes les Termes
                        & Conditions, avoir lu la Politique de Confidentialité
                        et avoir au moins 18 ans
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]"
                >
                    S'enregistrer
                </Button>
            </form>
        </Form>
    );
}
