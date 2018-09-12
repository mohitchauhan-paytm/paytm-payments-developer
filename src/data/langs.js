/*
 * @Author: Apurav Chauhan 
 * @Date: 2018-08-20 16:48:11 
 * @Last Modified by: Apurav Chauhan
 * @Last Modified time: 2018-08-20 17:27:30
 */

import hi from 'react-intl/locale-data/hi';
import pa from 'react-intl/locale-data/pa';
import en from 'react-intl/locale-data/en';
import enData from './msg/en';
import hiData from './msg/hi'
import paData from './msg/pa'

const langMap = {
    'en': { desc: 'English', root: '/', localeData: en, data: enData },
    'hi': { desc: 'हिन्दी', root: '/hi', localeData: hi, data: hiData },
    'pa': { desc: 'ਪੰਜਾਬੀ', root: '/pa', localeData: pa, data: paData }
};

export class LangUtils {
    static currentLocale = 'en';
    /**
     * This will reset the locale based on URL. Modify this method in case your app doesn't work in root mode
     */
    static checkURLLocale() {
        if (typeof window !== 'undefined' && window.location) {
            let locale = window.location.pathname.split('/')[1]
            if (!(locale && langMap[locale])) {
                locale = 'en'
            }
            LangUtils.currentLocale = locale;
        }
    }
    static newURL(locale) {
        if (typeof window !== 'undefined' && window.location) {
            let pathParts = window.location.pathname.split('/');
            if (pathParts[1] && langMap[pathParts[1]]) {
                pathParts[1] = locale;
            } else {
                pathParts.splice(1, 0, locale);
            }
            return pathParts.join('/');
        }
    }
}
LangUtils.checkURLLocale();
export default langMap;