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
import MultiSelect from '../input/Multiselect';

// Définition du schéma de validation avec Zod
const courseSchema = z.object({
    title: z.string().min(3, 'Le titre est requis'),
    description: z
        .string()
        .min(10, 'La description doit contenir au moins 10 caractères'),
    price: z.number().positive('Le prix doit être un nombre positif'),
    duration: z.string(),
    hours: z.string(),
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

function CoursesForm(): JSX.Element {
    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            duration: '',
            hours: '',
            days: [],
            address: '',
            city: '',
            image: null,
        },
    });

    const onSubmit = (): void => {
        console.log('Données envoyées :');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full flex flex-col"
            >
                <h1 className="font-semibold text-lg">Ajout d'une activité</h1>

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
                                        type="number"
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

                <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <MultiSelect
                                    options={optionsDays}
                                    field={field}
                                />{' '}
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
    );
}

export default CoursesForm;
