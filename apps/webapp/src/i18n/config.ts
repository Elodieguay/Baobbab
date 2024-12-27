import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonFr from './locales/fr/common.json';
import errorsFr from './locales/fr/errors.json';

export enum Locales {
    FR = 'fr',
}

export const config: InitOptions = {
    debug: false,
    ns: ['common', 'errors'],
    defaultNS: 'common',
    fallbackNS: 'common',
    resources: {
        [Locales.FR]: {
            common: commonFr,
            errors: errorsFr,
        },
    },
    lng: Locales.FR,
    fallbackLng: Locales.FR,
    interpolation: {
        escapeValue: false,
    },
};

i18n.use(initReactI18next).init(config);

export const locales = [{ locale: Locales.FR, name: 'Français' }];

export default i18n;
