// import { Button } from '../ui/button';
import { CoursesDTOGeojson, UserBooking } from '@baobbab/dtos';
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
import {
    useCreateABooking,
    useGetBookingById,
    useUpdateUserBooking,
} from '@/hooks/booking/query';
import { useToast } from '@/hooks/use-toast';
import { useGetUser } from '@/hooks/user/query';
import { useAuth } from '@/context/Auth.context';

export type ModalBookingProps = {
    courseData?: CoursesDTOGeojson | undefined;
    mode?: 'create' | 'update';
    booking?: UserBooking;
};
export const bookingFormSchema = z.object({
    title: z.string(),
    day: z.string().nonempty(),
});
const ModalBooking = ({
    courseData,
    mode = 'create',
    booking,
}: ModalBookingProps): JSX.Element => {
    const { authToken } = useAuth();
    const { data: user } = useGetUser(authToken || '');
    const userId = user?.id;
    const { toast } = useToast();
    const { data: courseBookingData } = useGetBookingById(booking?.id ?? '');
    const { mutateAsync: createBooking } = useCreateABooking();
    const { mutate: updateBooking } = useUpdateUserBooking();
    const bookingFormSchema = z.object({
        title: z.string(),
        day: z.string().nonempty(),
    });

    log.debug('userId', userId);
    log.debug('courseData de modal', courseBookingData);
    log.debug('courseSchedule', courseData?.schedule);
    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            title: booking?.title ?? '',
            day: booking?.schedule.day ?? '',
        },
    });

    const onSubmit = (values: z.infer<typeof bookingFormSchema>): void => {
        if (!userId) {
            toast({
                title: 'Utilisateur non identifié',
                variant: 'destructive',
            });
            return;
        }
        const [day, hours] = values.day.split(',');
        const dayObject = { day, hours };
        if (mode === 'update') {
            updateBooking(
                {
                    userId: userId,
                    bookingId: booking?.id,
                    updateBooking: {
                        title: values.title,
                        schedule: dayObject,
                        courseId: courseData?.id ?? '',
                        scheduleId: courseData?.schedule[0].id ?? '',
                    },
                },
                {
                    onSuccess: () =>
                        toast({ title: 'Votre réservation est mise à jour' }),
                    onError: () =>
                        toast({
                            title: 'La mise à jour a échoué',
                            variant: 'destructive',
                        }),
                }
            );
        } else {
            createBooking(
                {
                    userId: userId,
                    createBooking: {
                        title: values.title,
                        schedule: dayObject,
                        courseId: courseData?.id ?? '',
                        scheduleId: courseData?.schedule[0].id ?? '',
                    },
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
        }
    };
    log.debug('value', form.getValues());
    return (
        <Form {...form}>
            {courseData?.title}
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
                                    data={
                                        courseData?.schedule ||
                                        courseBookingData?.schedule
                                    }
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
                    {mode === 'update'
                        ? ' Mettre à jour la réservation'
                        : "Je confirme le cours d'essai"}
                </Button>
            </form>
        </Form>
    );
};

export default ModalBooking;
