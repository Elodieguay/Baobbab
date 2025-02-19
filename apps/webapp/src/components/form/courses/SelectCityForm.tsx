import { citySchema } from '@/utils/schema';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { useCity } from '@/context/City.context';
import { useLocation } from 'react-router';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useTranslation } from 'react-i18next';

const SelectCityForm = ({
    form,
    onSubmit,
    children,
}: {
    form: UseFormReturn<z.infer<typeof citySchema>>;
    onSubmit: (data: z.infer<typeof citySchema>) => void;
    children: JSX.Element;
}): JSX.Element => {
    const location = useLocation();
    const { t } = useTranslation('common', {
        keyPrefix: 'Home',
    });
    const { setCity } = useCity();
    const onSubmitForm = (values: z.infer<typeof citySchema>): void => {
        onSubmit({
            city: values.city,
        });
        setCity(values.city);
    };
    // console.log('city', form.getValues('city'));

    return (
        <Form {...form}>
            <form
                className="w-full flex items-center justify-center "
                onSubmit={form.handleSubmit(onSubmitForm)}
            >
                <div className="flex items-center bg-white border-none rounded-xl h-full overflow-hidden w-full max-w-lg">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-grow ">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="h-full rounded-none text-base border-none">
                                            {location.pathname === '/' ? (
                                                <SelectValue placeholder="Selectionne une ville" />
                                            ) : (
                                                <SelectValue
                                                    placeholder="Changer de ville"
                                                    className="text-center"
                                                />
                                            )}
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Nantes">
                                            {t('selectCityNantes')}
                                        </SelectItem>
                                        <SelectItem
                                            value="Paris"
                                            className=" pointer-events-none bg-slate-100"
                                        >
                                            {t('selectCityParis')}
                                        </SelectItem>
                                        <SelectItem
                                            value="Capdenac-Gare"
                                            className=" pointer-events-none bg-slate-100"
                                        >
                                            {t('selectCityCapdenac')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {children}
                </div>
            </form>
        </Form>
    );
};

export default SelectCityForm;
