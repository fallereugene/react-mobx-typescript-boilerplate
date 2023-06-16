import Element from './element';

type TemplateDescriptor = {
    // элемент пользовательского интерфейса, позволяющий управлять отображением
    element: Element;
    // опции шаблона: заголовок, описание и т.д.
    options: {
        title: string;
    };
};

export default TemplateDescriptor;
