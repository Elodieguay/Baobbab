import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@radix-ui/react-select';
import { Form } from 'react-router';
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
// import { coursesSchema } from "@/utils/schema";
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import MultiSelect from './Multiselect';
import { courseFormSchema, CourseRegisterDTO } from '@baobbab/dtos';

const CoursesForm = ({
    organisationId,
    form,
    onSubmit,
    children,
}: {
    organisationId: string;
    form: UseFormReturn<z.infer<typeof courseFormSchema>>;
    onSubmit: (params: {
        organisationId: string;
        courseRegister: CourseRegisterDTO;
    }) => void;
    children: JSX.Element;
}): JSX.Element => {
    const onSubmitForm = (values: z.infer<typeof courseFormSchema>): void => {
        onSubmit({
            organisationId,
            courseRegister: {
                name: values.name,
                address: values.address,
                details: values.details,
                days: values.days,
                hours: values.hours,
                reminder: values.reminder,
                tags: values.tags,
            },
        });
    };

    const optionsDays = [
        { label: 'Lundi', value: 'monday' },
        { label: 'Mardi', value: 'tuesday' },
        { label: 'Mercredi', value: 'wednesday' },
        { label: 'Jeudi', value: 'thursday' },
        { label: 'Vendredi', value: 'friday' },
        { label: 'Samedi', value: 'saturday' },
        { label: 'Dimanche', value: 'sunday' },
    ];

    return (
        <Form {...form}>
            <form
                className="w-full flex items-center justify-center "
                onSubmit={form.handleSubmit(onSubmitForm)}
            >
                <div className="flex items-center bg-white border-none rounded-xl h-full overflow-hidden w-full max-w-lg">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="name"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="name"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="prénom"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hours"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="name"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <MultiSelect
                                        options={optionsDays}
                                        field={field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reminder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="name"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="tags"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        placeholder="name"
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <Button
                        type="submit"
                        className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]"
                    >
                        Envoyer
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CoursesForm;
