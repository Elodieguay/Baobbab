// import { Button } from '../ui/button';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import log from 'loglevel';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBooking from './SelectBooking';
import { Button } from '../ui/button';
import { useCreateABooking } from '@/hooks/booking/query';
import { useToast } from '@/hooks/use-toast';

type ModalBookingProps = {
    data: CoursesDTOGeojson | undefined;
};
const ModalBooking = ({ data }: ModalBookingProps): JSX.Element => {
    // log.info(data);
    const { toast } = useToast();

    const { mutate: createABooking } = useCreateABooking();
    const bookingFormSchema = z.object({
        title: z.string(),
        day: z.string().nonempty(),
    });

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            title: data?.title,
            day: '',
        },
    });

    const onSubmit = (values: z.infer<typeof bookingFormSchema>): void => {
        const [day, hours] = values.day.split(',');
        const dayObject = { day, hours };

        // if (!data || !data.schedule || !data.schedule.length) {
        //     toast({
        //         title: 'Erreur',
        //         description: 'Les informations de schedule sont manquantes.',
        //         variant: 'destructive',
        //     });
        // }
        createABooking(
            {
                title: values.title,
                schedule: dayObject,
                courseId: data?.id ?? '',
                scheduleId: data?.schedule[0].id ?? '',
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Votre cours d'essai est enregistré",
                        variant: 'default',
                    });
                },

                onError: () => {
                    toast({
                        title: 'Votre réservation a échoué',
                        variant: 'destructive',
                    });
                },
            }
        );
    };
    log.debug('value', form.getValues());
    return (
        <Form {...form}>
            {data?.title}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <SelectBooking
                                    title="Jours"
                                    data={data?.schedule}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    variant="outline"
                    className="rounded-xl w-full bg-[#ffcd00] text-base"
                >
                    Je confirme le cours d'essai
                </Button>
            </form>
        </Form>
    );
};

export default ModalBooking;
