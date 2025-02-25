import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateOrganisationInfos } from '@/hooks/organisation/useOrganisation';
import { organisationFormSchema } from '@baobbab/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import log from 'loglevel';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type Values = z.infer<typeof organisationFormSchema>;

interface OrganisationInfosFormProps {
    organisationId: string;
}

const OrganisationInfosForm = ({
    organisationId,
}: OrganisationInfosFormProps): JSX.Element => {
    const { mutate } = useUpdateOrganisationInfos(organisationId);
    const form = useForm<Values>({
        resolver: zodResolver(organisationFormSchema),
        mode: 'onChange',
        defaultValues: {},
    });
    // const onSubmitLoginForm = (
    //         values: z.infer<typeof organisationLoginFormSchema>
    //     ): void => {
    //         organisationLogin({
    //             ...values,
    //             role: UserRole.ADMIN,
    //         });

    //     }
    const onSubmit = (values: Values): void => {
        log.info('je suis là');
        mutate({
            updateOrganisationInfo: {
                firstname: values.firstname,
                lastname: values.lastname,
                phone: values.phone,
                address: values.address,
                bio: values.bio,
                website: values.website,
                socialMediaInstagram: values.socialMediaInstagram,
                socialMediaFaceBook: values.socialMediaFaceBook,
                socialMediaTwitter: values.socialMediaTwitter,
                socialMediaTikTok: values.socialMediaTikTok,
            },
        });
    };
    console.log('all values:', form.getValues());

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full flex flex-col"
            >
                <h1 className="font-semibold text-lg">Faisons connaissance</h1>
                <div className="flex flex-grow w-full gap-2 ">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="prénom"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="nom"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h1 className="font-semibold text-lg">Votre établissement</h1>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="téléphone"
                                        className="w-full"
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
                                        placeholder="adresse"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h1 className="font-semibold  text-lg">Que proposez-vous ?</h1>
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Description de ce que vous faîtes"
                                    className="h-40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <h1 className="font-semibold  text-lg">
                    On peut jeter un coup d'oeil ?
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="site web"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="socialMediaInstagram"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="url"
                                        placeholder="insta"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="socialMediaFaceBook"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="url"
                                        placeholder="facebook"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="socialMediaTwitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="url"
                                        placeholder="twitter"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="socialMediaTikTok"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="url"
                                        placeholder="Tiktok"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* <h1 className="font-semibold text-white text-lg">
                    Une ou des photos, c'est plus sympa 🥰
                </h1> */}
                {/* <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
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
                /> */}

                <Button
                    type="submit"
                    className="w-full bg-[#fdcf63] rounded-xl hover:bg-[#be3565]"
                >
                    S'enregistrer
                </Button>
            </form>
        </Form>
    );
};

export default OrganisationInfosForm;

// const { mutate: organisationRegister, isPending } = useOrganisationRegister();

// const form = useForm<z.infer<typeof organisationFormSchema>>({
//     resolver: zodResolver(organisationFormSchema),
//     mode: 'onChange',
//     defaultValues: {},
// });

// function onSubmitForm( values: z.infer<typeof organisationFormSchema>){
//     let imageFile: File | string = values.image; // Accepter File ou string

//     if (!(imageFile instanceof File)) {
//         console.warn("Aucune image valide sélectionnée");
//         return;
//     }

//     // Appel de la mutation
//     const updatedValues: OrganisationRegisterDTO & {image:File} = {
//         ...values,
//         status: Status.PENDING,
//         role: UserRole.ADMIN,
//         image: imageFile

//     };
//     organisationRegister(updatedValues);
// };

// export const imageUploadDTOSchema = z.object({
//     data: z.custom<File>((file) => file instanceof File, {
//         message: "L'image doit être un fichier valide",
//     }),
//     maxValue: z.number().optional(),
// });
