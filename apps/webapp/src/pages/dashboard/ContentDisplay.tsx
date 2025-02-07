import CoursesForm from '@/components/form/courses/CoursesForm';
import TestImageFile from '@/components/form/TestImageFile';
import { courseFormSchema } from '@baobbab/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ContentDisplay = ({
    activeItem,
}: {
    activeItem: string;
}): JSX.Element => {
    const id = 'ert';
    const form = useForm<z.infer<typeof courseFormSchema>>({
        resolver: zodResolver(courseFormSchema),
        mode: 'onChange',
        defaultValues: {},
    });

    const handleSubmit = (): void => {};
    const contentMap: Record<string, JSX.Element> = {
        Playground: (
            <div className="w-full border-2 flex flex-col">
                <CoursesForm
                    form={form}
                    onSubmit={handleSubmit}
                    organisationId={id}
                />
            </div>
        ),
        Settings: (
            <div>
                <TestImageFile />
            </div>
        ),
        History: <div>Voici votre historique.</div>,
        Starred: <div>Voici vos favoris.</div>,
        Team: <div>Voici les paramètres de l'équipe.</div>,
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">{activeItem}</h1>
            <div>
                {contentMap[activeItem] || <div>Contenu non disponible.</div>}
            </div>
        </div>
    );
};
