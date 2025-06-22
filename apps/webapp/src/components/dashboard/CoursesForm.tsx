import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MultiSelect from '../form/input/Multiselect';
import { useGetCategory } from '@/hooks/courses/query';
import { useState } from 'react';

const courseSchema = z.object({
    title: z.string().min(3, 'Le titre est requis'),
    description: z
        .string()
        .min(10, 'La description doit contenir au moins 10 caractères'),
    price: z.coerce.number().min(1, 'Le prix est requis'),
    duration: z.coerce.number(),
    hours: z.string(),
    category: z
        .array(z.string())
        .nonempty('Sélectionne au moins une catégorie'),
    days: z.array(z.string()).nonempty('Sélectionne au moins un jour'),
    address: z.string().min(5, "L'adresse est requise"),
    city: z.string().optional(),
    image: z.any().optional(),
});

const optionsDays = [
    { label: 'Lundi', value: 'Monday' },
    { label: 'Mardi', value: 'Tuesday' },
    { label: 'Mercredi', value: 'Wednesday' },
    { label: 'Jeudi', value: 'Thursday' },
    { label: 'Vendredi', value: 'Friday' },
    { label: 'Samedi', value: 'Saturday' },
    { label: 'Dimanche', value: 'Sunday' },
];

const CoursesForm = (): JSX.Element => {
    const { data: category } = useGetCategory();
    // const { mutateAsync: createCourse } = useCreateCourse();
    const [disabled] = useState(true);
    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            duration: 0,
            hours: '',
            days: [],
            category: [],
            address: '',
            city: '',
            image: null,
        },
    });

    const onSubmit = () => {
        // createCourse({
        //     createCourse: {
        //         title: values.title,
        //         description: values.description,
        //         address: values.address,
        //         city: values.city ?? null,
        //         category: values.category ,
        //         price: values.price,
        //         duration: values.duration,
        //         schedule: values.days.map((day, idx) => ({
        //             id: `${day}-${idx}-${Date.now()}`,
        //             day,
        //             hours: values.hours,
        //         })),
        //         image: 'https://www.pexels.com/fr-fr/photo/deux-emoji-jaunes-sur-etui-jaune-207983&w=800&q=75&fm=webp',
        //         position: {
        //             type: 'Point',
        //             coordinates: [-1.553621, 47.218371],
        //         },
        //         organisationId: sessionStorage.getItem('organisationId')!,
        //     },
        // });
    };

    return (
        <div className="w-full relative">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full flex flex-col"
                >
                    <h1 className="font-semibold text-lg">
                        Ajout d'une activité
                    </h1>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Titre"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Description de l'activité"
                                        className="h-40"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Prix (€)"
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Durée (ex: 1h30)"
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <MultiSelect
                                            options={
                                                Array.isArray(category)
                                                    ? category.map((cat) => ({
                                                          label: cat.title,
                                                          value: cat.id,
                                                      }))
                                                    : []
                                            }
                                            field={field}
                                            placeholder="Sélectionner une catégorie"
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
                                            placeholder="Horaires (ex: 14h-16h)"
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <MultiSelect
                                        options={optionsDays}
                                        field={field}
                                        placeholder="Sélectionner les jours"
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
                                        placeholder="Adresse"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Ville"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            field.onChange(file);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[#fdcf63] rounded-xl hover:bg-[#be3565]"
                    >
                        Ajouter l'activité
                    </Button>
                </form>
            </Form>
            {disabled && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center pointer-events-auto">
                    <div className="text-center space-y-2 px-4">
                        <p className="text-lg font-semibold text-red-700">
                            Cette fonctionnailité arrive bientôt.
                        </p>
                        <p className="text-sm text-gray-700">
                            Vous ne pouvez pas encore créer de cours sur la
                            plateforme.
                            <br />
                            Contactez-nous à :
                            <span className="font-medium ">pro@baobbab.fr</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesForm;
