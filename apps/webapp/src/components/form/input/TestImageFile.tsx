import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { ImageUploadDTO} from '@/api/imageUpload';
// import { useUploadMutation } from '@/hooks/form/useUploadMutation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

// export const imageFormSchema= z.object({
//     image : z
//         .array(z.instanceof(File))
//         .min(1, { message: "Veuillez mettre une image"})
//         .max(1, { message: "Une seule image est autorisée" })
//         .refine(
//             (files) => files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
//             "Format invalide. Choisissez une image en JPEG, PNG ou WebP."
//         )
//         .refine(
//             (files) => files.length === 0 || files[0].size <= MAX_FILE_SIZE,
//             "La taille maximale autorisée est de 2 Mo."
//         )
// })

export const imageFormSchema = z.object({
    image: z
        .custom<File>((file) => file instanceof File, {
            message: "L'image doit être un fichier valide",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message:
                'Format invalide. Choisissez une image en JPEG, PNG ou WebP.',
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: 'La taille maximale autorisée est de 2 Mo.',
        }),
});

// Schema for the upload DTO
export const imageUploadDTOSchema = z.object({
    data: z.custom<File>((file) => file instanceof File, {
        message: "L'image doit être un fichier valide",
    }),
    maxValue: z.number().optional(),
});

const TestImageFile = (): JSX.Element => {
    // const { mutate: uploadImage, isPending } = useUploadMutation();

    const form = useForm<z.infer<typeof imageFormSchema>>({
        resolver: zodResolver(imageFormSchema),
        mode: 'onChange',
        defaultValues: {
            image: undefined,
        },
    });

    // function onSubmitForm(values: z.infer<typeof imageFormSchema>): void {
    //     // Vérifier s'il y a une image
    //     if (values.image && values.image.length > 0) {
    //         const selectedFile = values.image[0];

    //         // Créer l'objet ImageUploadDTO attendu par onSubmit
    //         const imageUploadData: ImageUploadDTO = {
    //             data: selectedFile, // Assignation correcte du fichier
    //             maxValue: selectedFile.size / 1024, // Taille en Ko
    //         };

    //         // Appeler la fonction d'upload avec ImageUploadDTO
    //         uploadImage(imageUploadData);
    //     } else {
    //         console.warn("Aucune image sélectionnée");
    //     }
    // }

    function onSubmitForm(values: z.infer<typeof imageFormSchema>): void {
        console.log('Form values:', values);
        console.log('Image file:', values.image);
        console.log('Image type:', values.image?.type);
        console.log('Image size:', values.image?.size);

        if (!values.image) {
            console.warn('Aucune image seléctionnée');
            return;
        }

        // Crée l'objet ImageUploadDTO
        // const imageUploadData: ImageUploadDTO = {
        //     data: values.image,
        //     maxValue: values.image.size / 1024,
        // };

        // if (file && file instanceof File) {
        //     const imageUploadData: ImageUploadDTO = {
        //         data: file, // Le fichier unique
        //         maxValue: file.size / 1024, // Taille en Ko
        //     };

        // Passe-le à la fonction `onSubmit`
        // uploadImage(imageUploadData);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    // name={field.name}
                                    // ref={field.ref}
                                    // onBlur={field.onBlur}
                                    type="file"
                                    accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                                    onChange={(e) => {
                                        const file = e.target.files
                                            ? e.target.files[0]
                                            : null; // Récupérer le fichier
                                        console.log(file); // Vérifier ce que contient `file`

                                        if (file) {
                                            field.onChange(file); // Passer à Zod
                                            console.log(
                                                'File type:',
                                                file.type
                                            );
                                            console.log(
                                                'File size:',
                                                file.size
                                            );
                                        } else {
                                            field.onChange(null); // Si aucun fichier n'est sélectionné
                                        }
                                    }}
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    // disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <Button
                    type="submit"
                    className="w-full bg-[#0b927a] rounded-xl hover:bg-[#fdcf63]"
                    disabled={isPending}
                >
                    {isPending ? 'Envoi en cours...' : "S'enregistrer"}
                </Button> */}
            </form>
        </Form>
    );
};

export default TestImageFile;
