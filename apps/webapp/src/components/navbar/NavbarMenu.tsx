import { useTranslation } from 'react-i18next';
import log from 'loglevel';
import { CategoryDTO } from '@baobbab/dtos';

type NavbarMenuProps = {
    setSelectedCategory: (category: string) => void;
    categoryList: CategoryDTO[];
};

// Fonction pour trouver l'id de la catégorie correspondant au titre
export const getCategoryIdFromTitle = (
    categoryList: CategoryDTO[],
    title: string
): string | null => {
    const category = categoryList?.find((cat) => cat.title === title);
    return category ? category.id : null;
};

const NavbarMenu = ({
    setSelectedCategory,
    categoryList,
}: NavbarMenuProps): JSX.Element => {
    const { t } = useTranslation('common', {
        keyPrefix: 'SubNavbar',
    });

    // // Fonction pour trouver l'id de la catégorie correspondant au titre
    // const getCategoryIdFromTitle = (title: string): string | null => {
    //     const category = categoryList?.find((cat) => cat.title === title);

    //     log.debug('category', category);
    //     return category ? category.id : null;
    // };

    const handleCategoryClick = (categoryTitle: string) => {
        log.debug('categoryTitle', categoryTitle);
        const categoryId = getCategoryIdFromTitle(categoryList, categoryTitle);
        log.debug('categoryId', categoryId);
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    };

    const categories = [
        'culture',
        'sport',
        'dance',
        'health',
        'life',
        'environment',
        'event',
    ];

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden px-4 no-scrollbar">
            <div className="flex flex-nowrap gap-3 min-w-max py-2 justify-center">
                {categories.map((key) => (
                    <button
                        key={key}
                        onClick={() => handleCategoryClick(t(key))}
                        className="bg-white text-black border border-gray-300 text-sm px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition"
                    >
                        {t(key)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NavbarMenu;
