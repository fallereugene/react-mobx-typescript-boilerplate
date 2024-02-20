import { CreateTemplate } from '@storybook-utils';
import { Checkbox, CheckboxProps } from '.';

const defaultProps: CheckboxProps = {
    label: '',
    text: '',
    disabled: false,
    checked: false,
    // eslint-disable-next-line
    onChange: (e) => console.info('--- onChange', e.target.checked),
};

export default { component: Checkbox };

export const Unchecked = CreateTemplate(Checkbox, defaultProps);

export const Checked = CreateTemplate(Checkbox, {
    ...defaultProps,
    checked: true,
});

export const Disabled = CreateTemplate(Checkbox, {
    ...defaultProps,
    disabled: true,
});

export const WidthLabel = CreateTemplate(Checkbox, {
    ...defaultProps,
    label: 'Заголовок',
});

export const WithLabelCheckedDisabled = CreateTemplate(Checkbox, {
    ...defaultProps,
    label: 'Заголовок',
    disabled: true,
    checked: true,
});

export const WithLabelAndHelperText = CreateTemplate(Checkbox, {
    ...defaultProps,
    label: 'Заголовок',
    text: 'some additional text',
});
