import { useFormik } from 'formik';
import OptionType from './option-type';

type ControlProps = {
    // описание ошибки валидации
    errorText: string;
    // тип дескриптора
    type?: OptionType;
    // значение
    value: string;
    // имя дескриптора
    name: string;
    // лэйбл
    label: string;
    // подсказка
    prompt: string;
    // обработка onChange события
    onChange: ReturnType<typeof useFormik>['handleChange'];
    // обработка onBlur события
    onBlur?: ReturnType<typeof useFormik>['handleBlur'];
};

export default ControlProps;
