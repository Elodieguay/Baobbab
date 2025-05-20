import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Footer = (): JSX.Element => {
    const { t } = useTranslation('common', {
        keyPrefix: 'Footer',
    });
    return (
        <footer className="flex w-full justify-center bg-[#373737] py-10 px-6">
            <div className="flex flex-col md:flex-row w-full max-w-7xl gap-8 md:gap-12 justify-between">
                <div className="flex flex-col w-full md:w-1/3 gap-4">
                    <h1 className="text-white text-2xl md:text-3xl font-semibold">
                        <Trans
                            i18nKey="Footer.logo"
                            components={{
                                span: <span className="text-[#01a274]" />,
                            }}
                        />
                    </h1>
                    <p className="text-white text-base leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="flex flex-col w-full md:w-1/3 gap-2 text-white">
                    <Link to="/" className="text-base hover:underline">
                        {t('aboutUs')}
                    </Link>
                    <Link to="/courses" className="text-base hover:underline">
                        {t('findCourse')}
                    </Link>
                    <Link to="/" className="text-base hover:underline">
                        {t('legal')}
                    </Link>
                    <Link to="/" className="text-base hover:underline">
                        {t('cgu')}
                    </Link>
                    <Link
                        to="/organisation"
                        className="text-base hover:underline"
                    >
                        {t('organisation')}
                    </Link>
                </div>

                <div className="flex justify-start md:justify-end items-center gap-6 w-full md:w-1/3">
                    <Instagram className="h-6 w-6 text-white hover:text-[#01a274]" />
                    <Facebook className="h-6 w-6 text-white hover:text-[#01a274]" />
                    <Twitter className="h-6 w-6 text-white hover:text-[#01a274]" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
