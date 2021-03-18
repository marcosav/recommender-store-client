import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const backend = new Backend(null, { loadPath: 'locales/{{lng}}/{{ns}}.json' })

i18n.use(backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        debug: false,
        whitelist: ['es', 'en'],
        react: {
            wait: true,
        },
    })

export default i18n
