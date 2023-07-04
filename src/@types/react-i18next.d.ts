// import the original type declarations
import 'i18next';
import { resources } from '@services/localization';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom resources type
        resources: (typeof resources)['en'];
    }
}
