// import the original type declarations
import 'i18next';
import * as resources from '@/locales';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom resources type
        resources: (typeof resources)['en'];
        returnNull: false;
    }
}
