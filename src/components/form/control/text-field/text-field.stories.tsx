import { CreateTemplate } from '@storybook-utils';
import { TextField, TextFieldProps } from '.';

const defaultProps: TextFieldProps = {
    label: 'Label title',
    variant: 'outlined',
    disabled: false,
    error: false,
    multiline: false,
    fullWidth: false,
    adornment: '',
    type: 'text',
    helperText: '',
    placeholder: '',
    size: 'medium',
    adornmentPosition: 'start',
    // eslint-disable-next-line
    onChange: (e) => console.info('----onChange', e.target.value),
    // eslint-disable-next-line
    onFocus: () => console.info('----onFocus'),
    // eslint-disable-next-line
    onBlur: () => console.info('----onBlur'),
};

export default { component: TextField };

export const RegularOutlinedInput = CreateTemplate(TextField, defaultProps);

export const RegularFilledInput = CreateTemplate(TextField, {
    ...defaultProps,
    variant: 'filled',
});

export const InputInDisabledState = CreateTemplate(TextField, {
    ...defaultProps,
    disabled: true,
});

export const InputInErrorState = CreateTemplate(TextField, {
    ...defaultProps,
    helperText: 'With helper text',
    error: true,
});

export const InputWithAdornmentAtStart = CreateTemplate(TextField, {
    ...defaultProps,
    adornment: 'RUB',
    type: 'number',
});

export const InputWithAdornmentAtEnd = CreateTemplate(TextField, {
    ...defaultProps,
    adornment: 'RUB',
    type: 'number',
    adornmentPosition: 'end',
});

export const InputWithHelperText = CreateTemplate(TextField, {
    ...defaultProps,
    helperText: 'With helper text',
});

export const InputWithDefaultValue = CreateTemplate(TextField, {
    ...defaultProps,
    value: 'some value',
});

export const InputWithoutLabel = CreateTemplate(TextField, {
    ...defaultProps,
    label: undefined,
});

export const MultilineInput = CreateTemplate(TextField, {
    ...defaultProps,
    multiline: true,
    value: 'some long text, some long text, some long text',
});

export const InputWithPlaceholder = CreateTemplate(TextField, {
    ...defaultProps,
    label: undefined,
    placeholder: 'Enter any value',
});

export const InputWithMask = CreateTemplate(TextField, {
    ...defaultProps,
    label: 'Enter phone number',
    placeholder: 'Enter phone number',
    mask: '+7(999)9999999',
});
