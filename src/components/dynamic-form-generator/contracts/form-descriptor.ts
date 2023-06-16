import Control from './control';
import OptionType from './option-type';

type FormDescriptor = {
    // тип контрола: input, checkbox, radio etc
    type: Control;
    // имя поля
    name: string;
    // опции контрола: подсказки, лэйблы, правила валидации для того или иного контрода
    options: {
        // тип, который определяет правила валидации: например, email будет
        // проверяться по соответсвующему регулярному выражению
        type?: OptionType;
        // признак обязательности/необязательности заполнения
        required?: boolean;
        // подсказка
        prompt?: string;
        // лэйбл
        label?: string;
        // описание контрола
        description?: string;
        // rule?: 'email';
        // минимальная длина, например, строки или минимальное значение для числа
        min?: number;
        // максимальная длина, например, строки или максимальное значение для числа
        max?: number;
        // значение по умолчанию
        defaultValue?: string;
    };
};

export default FormDescriptor;
