// import { Button } from '../ui/button';
import { CoursesDTOGeojson, ModeBooking } from '@baobbab/dtos';
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
import { useCreateABooking, useUpdateUserBooking } from '@/hooks/booking/query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/Auth.context';
import { useGetUser } from '@/hooks/user/query';
import { useTranslation } from 'react-i18next';

type ModalBookingProps = {
    courseData: CoursesDTOGeojson | undefined;
    mode?: ModeBooking;
    bookingId?: string;
    setIsModalOpen: (value: boolean) => void;
};
const ModalBooking = ({
    courseData,
    mode,
    bookingId,
    setIsModalOpen,
}: ModalBookingProps): JSX.Element => {
    const { authToken } = useAuth();
    const { data } = useGetUser(authToken || '');
    const userId = data?.id;
    const { t } = useTranslation('common');
    const { toast } = useToast();

    const { mutateAsync: createBooking } = useCreateABooking();

    const { mutateAsync: updateBooking } = useUpdateUserBooking();

    const bookingFormSchema = z.object({
        title: z.string(),
        day: z.string().nonempty(),
    });
    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            title: courseData?.title,
            day: '',
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
        if (mode === ModeBooking.UPDATE) {
            updateBooking(
                {
                    bookingId: bookingId,
                    userId: userId,
                    updateBooking: {
                        title: values.title,
                        schedule: dayObject,
                        courseId: courseData?.id ?? '',
                        scheduleId: courseData?.schedule[0].id ?? '',
                    },
                },
                {
                    onSuccess: () => {
                        toast({
                            title: t('Booking.modal.update.success'),
                            variant: 'success',
                        });
                        setIsModalOpen(false);
                    },

                    onError: () => {
                        toast({
                            title: t('Booking.modal.update.error'),
                            variant: 'destructive',
                        });
                        setIsModalOpen(false);
                    },
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
                            variant: 'success',
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
                                    data={courseData?.schedule}
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
                    {mode === ModeBooking.UPDATE
                        ? 'Je modifie ma réservation'
                        : "Je confirme le cours d'essai"}
                </Button>
            </form>
        </Form>
    );
};

export default ModalBooking;
