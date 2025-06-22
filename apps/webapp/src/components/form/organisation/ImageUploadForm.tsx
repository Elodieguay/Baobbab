import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useUploadMutation } from '@/hooks/form/useUploadMutation';
import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ImageUploadFormProps {
    organisationId: string;
    currentImage: string | null;
}

export function ImageUploadForm({
    organisationId,
    currentImage,
}: ImageUploadFormProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize form with React Hook Form
    const form = useForm();

    const { mutate: uploadImage } = useUploadMutation(organisationId);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        uploadImage({ imageUploadParams: file });
    };

    // Trigger file input click
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Organization Image</CardTitle>
                <CardDescription>
                    Upload or update your organization's profile image
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative mb-4">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl || '/placeholder.svg'}
                                        alt="Organization"
                                        className="w-40 h-40 rounded-full object-cover border-2 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                        <span className="text-gray-400">
                                            No image
                                        </span>
                                    </div>
                                )}
                                {/* {isPending && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  )} */}
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="button"
                            onClick={handleUploadClick}
                            className="w-full"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {previewUrl ? 'Change Image' : 'Upload Image'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
