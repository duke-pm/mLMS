/**
 ** Name: Config i18n
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of config-i18n.js
 **/
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import languages from './locales';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'vi',
  lng: 'vi',
  resources: languages,

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: false,

  // cache: {
  //   enabled: true
  // },

  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  },
});

export default i18n;
