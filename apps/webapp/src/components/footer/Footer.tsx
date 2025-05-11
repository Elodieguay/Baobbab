import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Footer = (): JSX.Element => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Footer',
    });
    return (
        <footer className="flex w-full justify-center  bg-[#373737] py-8 px-8 bottom-0 ">
            <div className="flex w-3/4 justify-between ">
                <div className="flex flex-col w-1/4 gap-5">
                    <h1 className="text-white text-3xl font-semibold">
                        <Trans
                            i18nKey="Footer.logo"
                            components={{
                                span: <span className="text-[#01a274]" />,
                            }}
                        />
                    </h1>
                    <p className="text-white text-base">{t('description')}</p>
                </div>

                <div className="flex flex-col justify-center gap-3 text-white">
                    <Link to="/" className="flex flex-col text-base text-white">
                        {t('aboutUs')}
                    </Link>
                    <Link
                        to="/courses"
                        className="flex flex-col text-base text-white"
                    >
                        {t('findCourse')}
                    </Link>
                    <Link to="/" className="flex flex-col text-base text-white">
                        {t('legal')}
                    </Link>
                    <Link to="/" className="flex flex-col text-base text-white">
                        {t('cgu')}
                    </Link>
                    <Link
                        to="/organisation"
                        className="flex flex-col text-base text-white"
                    >
                        {t('organisation')}
                    </Link>
                </div>
                <div className="flex  gap-4 items-center">
                    <Instagram className="h-6 w-6 text-white" />
                    <Facebook className="h-6 w-6 text-white" />
                    <Twitter className="h-6 w-6 text-white" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
