import { useTranslation } from 'react-i18next';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '../ui/navigation-menu';
import log from 'loglevel';
import { CategoryDTO } from '@baobbab/dtos';

type NavbarMenuProps = {
    setSelectedCategory: (category: string) => void;
    categoryList: CategoryDTO[];
};
const NavbarMenu = ({
    setSelectedCategory,
    categoryList,
}: NavbarMenuProps): JSX.Element => {
    const { t } = useTranslation('common', {
        keyPrefix: 'SubNavbar',
    });

    log.debug('categoryList', categoryList);

    // Fonction pour trouver l'id de la catégorie correspondant au titre
    const getCategoryIdFromTitle = (title: string): string | null => {
        const category = categoryList?.find((cat) => cat.title === title);

        log.debug('category', category);
        return category ? category.id : null;
    };

    const handleCategoryClick = (categoryTitle: string) => {
        log.debug('categoryTitle', categoryTitle);
        const categoryId = getCategoryIdFromTitle(categoryTitle);
        log.debug('categoryId', categoryId);
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    };

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border "
                        onClick={() => handleCategoryClick(t('culture'))}
                    >
                        {t('culture')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border"
                        onClick={() => handleCategoryClick(t('sport'))}
                    >
                        {t('sport')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border"
                        onClick={() => handleCategoryClick(t('dance'))}
                    >
                        {t('dance')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border"
                        onClick={() => handleCategoryClick(t('health'))}
                    >
                        {t('health')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border"
                        onClick={() => handleCategoryClick(t('life'))}
                    >
                        {t('life')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border"
                        onClick={() => handleCategoryClick(t('environment'))}
                    >
                        {t('environment')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="bg-none rounded-3xl border"
                        onClick={() => handleCategoryClick(t('event'))}
                    >
                        {t('event')}
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarMenu;
