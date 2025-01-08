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
import { useCity } from '@/context/City.context';

const SelectCityForm = ({
    form,
    onSubmit,
}: {
    form: UseFormReturn<z.infer<typeof citySchema>>;
    onSubmit: (data: z.infer<typeof citySchema>) => void;
}): JSX.Element => {
    const { setCity } = useCity();
    const onSubmitForm = (values: z.infer<typeof citySchema>): void => {
        onSubmit({
            city: values.city,
        });
        setCity(values.city);

        console.log('hello');
    };
    console.log('city', form.getValues('city'));

    return (
        <Form {...form}>
            <form
                className="w-full flex items-center justify-center "
                onSubmit={form.handleSubmit(onSubmitForm)}
            >
                <div className="flex items-center bg-white border-none rounded-xl h-14 shadow-sm overflow-hidden w-full max-w-lg">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="h-full rounded-none text-base border-none">
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
                        className="h-full bg-[#89a4a3] rounded-none text-base"
                    >
                        Je me lance
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SelectCityForm;
