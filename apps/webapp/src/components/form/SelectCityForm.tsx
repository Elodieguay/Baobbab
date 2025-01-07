import { Button } from '../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { citySchema } from '@/utils/schema';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../ui/select';

const SelectCityForm = ({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof citySchema>>;
    onSubmit: (data: z.infer<typeof citySchema>) => void;
}): JSX.Element => {
    const onSubmitForm = (values: z.infer<typeof citySchema>): void => {
        onSubmit({
            city: values.city,
        });
        console.log('hello');
    };
    console.log('city', form.getValues('city'));

    return (
        <Form {...form}>
            <form
                className="w-full flex items-center justify-center gap-2"
                onSubmit={form.handleSubmit(onSubmitForm)}
            >
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-12 rounded-xl text-base ">
                                        <SelectValue placeholder="Selectionne une ville" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Nantes">
                                        Nantes
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="h-12 bg-[#0b927a] rounded-xl hover:bg-[#d6667e] text-base"
                >
                    Je me lance
                </Button>
            </form>
        </Form>
    );
};

export default SelectCityForm;
