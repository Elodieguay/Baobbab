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
import {
    formLoginSchema,
    formSchema,
    UserLoginDTO,
    UserRole,
} from '@baobbab/dtos';
import { z } from 'zod';

export default function Login({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof formLoginSchema>>;
    onSubmit: (userLogin: UserLoginDTO) => void;
}): JSX.Element {
    function onSubmitForm(values: z.infer<typeof formLoginSchema>): void {
        //eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSubmit({
            email: values.email,
            password: values.password,
            role: UserRole.USER,
        }),
            console.log('je suis là dans onSubmitForm');
        console.log('Form values:', values);
    }

    console.log('all values', form.getValues());
    // console.log('handleSubmit', handleSubmit);
    return (
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
                    Se connecter
                </Button>
            </form>
        </Form>
    );
}
