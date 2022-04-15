import * as Yup from 'yup';
import { FormDescriptor } from '../contracts';

/**
 * Применение правил валидации для типа input
 * @param descriptor дескриптор
 * @returns правило валидации
 */
const processInputValidation = (descriptor: FormDescriptor): Yup.BaseSchema => {
    const { options } = descriptor;
    const { required = false, type = '', min } = options;
    let rule;

    switch (type) {
        case 'uri':
            rule = Yup.string().matches(/^(https?:\/\/)/, 'Not valid uri address.');
            break;
        case 'email':
            rule = Yup.string().email('Invalid email');
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
        rule = rule.min(6, `Minimum ${min} symbols required`);
    }

    if (required) {
        rule = rule.required(`Required field`);
    }

    return rule.nullable();
};

export default processInputValidation;
