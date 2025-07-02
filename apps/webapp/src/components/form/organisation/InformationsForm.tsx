import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
    useGetOrganisation,
    useOrganisationById,
    useUpdateOrganisationInfos,
} from '@/hooks/organisation/useOrganisation';
import { ImageUploadForm } from './ImageUploadForm';

const formSchema = z.object({
    firstname: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters.' }),
    lastname: z
        .string()
        .min(2, { message: 'Last name must be at least 2 characters.' }),
    phone: z.string().min(5, { message: 'Phone number is required.' }),
    address: z.string().min(5, { message: 'Address is required.' }),
    bio: z.string().optional(),
    website: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .optional()
        .or(z.literal('')),
    socialMediaInstagram: z.string().optional().or(z.literal('')),
    socialMediaFaceBook: z.string().optional().or(z.literal('')),
    socialMediaTwitter: z.string().optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const InformationsForm = () => {
    const { data: organisation } = useGetOrganisation();
    const organisationId = organisation?.id;
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();

    const {
        data: organisationData,
        isLoading,
        error,
    } = useOrganisationById(organisationId ?? '');

    const { mutate: updateOrganisation } = useUpdateOrganisationInfos(
        organisationId ?? ''
    );

    const defaultValues = useMemo(() => {
        return {
            firstname: organisationData?.firstname ?? '',
            lastname: organisationData?.lastname ?? '',
            phone: organisationData?.phone ?? '',
            address: organisationData?.address ?? '',
            bio: organisationData?.bio ?? '',
            website: organisationData?.website ?? '',
            socialMediaInstagram: organisationData?.socialMediaInstagram ?? '',
            socialMediaFaceBook: organisationData?.socialMediaFaceBook ?? '',
            socialMediaTwitter: organisationData?.socialMediaTwitter ?? '',
        };
    }, [organisationData]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (values: FormValues) => {
        updateOrganisation(
            {
                updateOrganisationInfo: {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    phone: values.phone,
                    address: values.address,
                    bio: values.bio ?? '',
                    website: values.website,
                    socialMediaInstagram: values.socialMediaInstagram ?? '',
                    socialMediaFaceBook: values.socialMediaFaceBook ?? '',
                    socialMediaTwitter: values.socialMediaTwitter ?? '',
                },
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description:
                            'Vos informations ont bien été enregistrées.',
                    });
                    setIsEditing(false);
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description:
                            "Une erreur est survenue lors de l'enregistrement de vos informations.",
                        variant: 'destructive',
                    });
                },
            }
        );
    };

    useEffect(() => {
        if (organisationData) {
            form.reset({
                firstname: organisationData.firstname ?? '',
                lastname: organisationData.lastname ?? '',
                phone: organisationData.phone ?? '',
                address: organisationData.address ?? '',
                bio: organisationData.bio ?? '',
                website: organisationData.website ?? '',
                socialMediaInstagram:
                    organisationData.socialMediaInstagram ?? '',
                socialMediaFaceBook: organisationData.socialMediaFaceBook ?? '',
                socialMediaTwitter: organisationData.socialMediaTwitter ?? '',
            });
        }
    }, [organisationData, form]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md text-red-800">
                Une erreur est subvenue lors du téléchargement. Essayez encore.
            </div>
        );
    }
    return (
        <div className="w-full h-full space-y-8 ">
            <Card className="w-full">
                <CardHeader className="gap-4">
                    <CardTitle>Vos données personnelles</CardTitle>
                    <CardDescription>
                        Vous pouvez modifier vos informations.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    disabled={!isEditing}
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
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    disabled={!isEditing}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={!isEditing}
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
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={!isEditing}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={!isEditing}
                                                className="min-h-[100px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={!isEditing}
                                                placeholder="https://example.com"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your organization's website URL
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Social Media
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="socialMediaInstagram"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instagram</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        disabled={!isEditing}
                                                        placeholder="username"
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
                                                <FormLabel>Facebook</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        disabled={!isEditing}
                                                        placeholder="username"
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
                                                <FormLabel>Twitter</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        disabled={!isEditing}
                                                        placeholder="username"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {!isEditing ? (
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Information
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        // disabled={Mutation.mutate.isPending}
                                    >
                                        {isLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Save Changes
                                    </Button>
                                </>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            {organisationData && (
                <ImageUploadForm
                    organisationId={organisationData.id}
                    currentImage={organisationData.image ?? ''}
                />
            )}
        </div>
    );
};

export default InformationsForm;
