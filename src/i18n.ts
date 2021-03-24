import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from './locales/es/translation'
import en from './locales/en/translation'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es,
            en,
        },
        fallbackLng: 'es',
        debug: false,
        whitelist: ['es', 'en'],
        react: {
            useSuspense: true,
            wait: true,
        },
    })

export default i18n
