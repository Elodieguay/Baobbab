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

    return (
        <Form {...form}>
            <form
                className="w-full h-14 flex items-center   "
                onSubmit={form.handleSubmit(onSubmitForm)}
            >
                <div className="flex items-center bg-white border-6 rounded-xl h-14 overflow-hidden w-full max-w-lg">
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
                                        <SelectTrigger className="h-14 rounded-l-md text-base ">
                                            {location.pathname === '/' ? (
                                                <SelectValue
                                                    placeholder={t('select')}
                                                />
                                            ) : (
                                                <SelectValue
                                                    placeholder={t(
                                                        'changeCity'
                                                    )}
                                                    className="text-center"
                                                />
                                            )}
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            value="Nantes"
                                            className="cursor-pointer"
                                        >
                                            {t('selectCityNantes')}
                                        </SelectItem>
                                        <SelectItem
                                            value="Paris"
                                            className=" pointer-events-none bg-slate-200"
                                        >
                                            {t('selectCityParis')}
                                        </SelectItem>
                                        <SelectItem
                                            value="Capdenac-Gare"
                                            className=" pointer-events-none bg-slate-200"
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
