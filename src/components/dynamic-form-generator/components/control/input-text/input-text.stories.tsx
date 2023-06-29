import { CreateTemplate } from '../../../../../../.storybook/utils';
import { InputText, InputProps } from '.';

const defaultProps: InputProps = {
    errorText: '',
    label: 'input label',
    disabled: false,
    prompt: '',
    name: '',
    type: 'text',
    value: '',
    onBlur: () => {},
    onChange: () => {},
    variant: 'outlined',
};

export default {
    title: 'Components/DynamicFormGenerator/Control/InputText',
    component: InputText,
};

export const Normal = CreateTemplate(InputText, {
    ...defaultProps,
});

export const Disabled = CreateTemplate(InputText, {
    ...defaultProps,
    disabled: true,
});

export const WithErrorText = CreateTemplate(InputText, {
    ...defaultProps,
    errorText: 'With error text',
});

export const WithDefaultValue = CreateTemplate(InputText, {
    ...defaultProps,
    value: 'With default value',
});
