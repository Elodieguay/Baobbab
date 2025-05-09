import { CoursesDTOGeojson } from '@baobbab/dtos';

interface getCategoryTitleProps {
    category: CoursesDTOGeojson['category'] | undefined;
    coursesInfos: CoursesDTOGeojson | undefined;
}
export const getCategoryTitle = ({
    category,
    coursesInfos,
}: getCategoryTitleProps) => {
    if (!category) {
        return null;
    }

    const categories = Array.isArray(category) ? category : [category];

    return (
        categories.find((cat) => cat.id === coursesInfos?.category?.id)
            ?.title || null
    );
};
