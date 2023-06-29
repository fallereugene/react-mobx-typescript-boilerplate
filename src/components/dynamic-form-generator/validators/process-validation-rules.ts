import * as Yup from 'yup';
import { FormDescriptor } from '../contracts';
import processInputValidation from './process-input-validation';

/**
 * Применение правил валидации к дескриптору форм
 * @param descriptor дескриптор формы
 * @returns правило валидации
 */
const processValidationRules = (descriptor: FormDescriptor): Yup.Schema => {
    const { type } = descriptor;
    switch (type) {
        case 'input':
            return processInputValidation(descriptor);
        default:
            return Yup.string();
    }
};

export default processValidationRules;
