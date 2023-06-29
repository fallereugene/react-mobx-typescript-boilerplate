import * as Yup from 'yup';
import _cloneDeep from 'lodash/cloneDeep';
import { Descriptor } from '../contracts';
import { processValidationRules } from '../validators';
import normalizeDescriptor from './normalize-descriptor';

/**
 * Нормализация схемы и применение правил валидации для дескрипторов
 * @param schema дескрипторы схемы
 * @param model модель данных
 * @returns начальные данные и правила валидации для дескрипторов
 */
const normalizeSchemaWithValidators = (schema: Descriptor[], model: any = {}) => {
    const isEmptyModel = !Object.entries(model).length;
    const initialValues: {
        [key: string]: ReturnType<typeof normalizeDescriptor>['options']['defaultValue'];
    } = isEmptyModel ? {} : _cloneDeep(model);
    const validationSchema: { [key: string]: Yup.Schema } = {};
    schema.forEach((descriptor) => {
        if ('name' in descriptor) {
            const normalizedDescriptor = normalizeDescriptor(descriptor);
            if (isEmptyModel) {
                initialValues[descriptor.name] = normalizedDescriptor.options.defaultValue;
            }
            validationSchema[descriptor.name] = processValidationRules(normalizedDescriptor);
        }
    });
    return { initialValues, validationSchema: Yup.object(validationSchema) };
};

export default normalizeSchemaWithValidators;
