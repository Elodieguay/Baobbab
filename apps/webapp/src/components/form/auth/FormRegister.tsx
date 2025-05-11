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
import { useTranslation } from 'react-i18next';
import log from 'loglevel';

export default function Register({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    onSubmit: (userRegister: UserRegisterDTO) => void;
}): JSX.Element {
    const { t } = useTranslation('common', { keyPrefix: 'Auth' });
    function onSubmitForm(values: z.infer<typeof formSchema>): void {
        //eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSubmit({
            username: values.username || '',
            email: values.email,
            password: values.password,
            role: UserRole.USER,
        }),
            log.warn(values);
    }

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
                                    placeholder={t(
                                        'userRegister.form.username'
                                    )}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('userRegister.form.description.username')}
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
                                    placeholder={t('userRegister.form.email')}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('userRegister.form.description.email')}
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
                                    placeholder={t(
                                        'userRegister.form.password'
                                    )}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('userRegister.form.description.password')}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-5">
                    <Checkbox className="h-6 w-6 border-slate-700 data-[state=checked]:bg-[#0b927a] rounded-md" />
                    <p>{t('userRegister.form.checkbox')}</p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]"
                >
                    {t('userRegister.form.button')}
                </Button>
            </form>
        </Form>
    );
}
