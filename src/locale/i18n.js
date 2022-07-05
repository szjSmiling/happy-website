import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zhLang from './zh'
import enLang from './en'

const defaultLang = 'zh'

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zhLang },
    en: { translation: enLang },
  },
  lng: defaultLang,
  fallbackLng: 'zh',
  // interpolation: {escapeValue: false} // 默认属性
})



export default i18n;