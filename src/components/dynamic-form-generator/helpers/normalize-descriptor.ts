import cloneDeep from 'lodash/cloneDeep';
import { FormDescriptor } from '../contracts';

type ExtendedData = {
    options: {
        defaultValue: string | number | boolean | any[];
    };
};

type NormalizedSchemaDescriptor = FormDescriptor & ExtendedData;

/**
 * Нормализация дескриптора. Наример, установка дефолтных значений для разных типов дескрипторов.
 * @param descriptor дескриптор формы
 * @returns нормализованный дескриптор
 */
const normalizeDescriptor = (descriptor: FormDescriptor): NormalizedSchemaDescriptor => {
    const descriptorCopy = cloneDeep<NormalizedSchemaDescriptor>(descriptor as NormalizedSchemaDescriptor);
    const { options } = descriptorCopy;

    switch (descriptorCopy.type as FormDescriptor['type']) {
        case 'input': {
            switch (options.type) {
                case 'password':
                case 'text':
                default:
                    options.defaultValue = '';
                    break;
            }
            break;
        }
        default:
            options.defaultValue = '';
            break;
    }

    return descriptorCopy;
};

export default normalizeDescriptor;
