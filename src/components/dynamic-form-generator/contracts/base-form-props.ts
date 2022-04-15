import Descriptor from './descriptor';

//
type BaseFormProps = {
    // дескрипторы схемы
    schema: Descriptor[];
    // сохранение формы
    onSubmit(data: any): void;
    // модель данных
    model?: { [key: string]: any } | null;
    // css-класс
    className?: string;
    // признак необходимости активировать/деактивировать форму
    disabled?: boolean;
    // запрос модели
    getModel?(): Promise<any>;
};

export default BaseFormProps;
