import * as Yup from 'yup';
import i18n from 'i18next';
import { FormDescriptor } from '../contracts';

/**
 * Применение правил валидации для типа input
 * @param descriptor дескриптор
 * @returns правило валидации
 */
const processInputValidation = (descriptor: FormDescriptor): Yup.Schema => {
    const { options } = descriptor;
    const { required = false, type = '', min, max } = options;
    let rule;

    switch (type) {
        case 'uri':
            rule = Yup.string().matches(/^(https?:\/\/)/, () => i18n.t('error:invalid_uri'));
            break;
        case 'email':
            rule = Yup.string().email(() => i18n.t('error:invalid_email'));
            break;
        case 'password':
            rule = Yup.string();
            break;
        case 'text':
        default: {
            rule = Yup.string();
            break;
        }
    }

    if (min) {
        rule = rule.min(min, ({ min }) => i18n.t('error:max_symbols', { symbols: min }));
    }

    if (max) {
        rule = rule.max(max, ({ max }) => i18n.t('error:max_symbols', { symbols: max }));
    }

    if (required) {
        rule = rule.required(() => i18n.t('error:required_field'));
    }

    return rule.nullable();
};

export default processInputValidation;
