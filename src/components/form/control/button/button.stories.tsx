import { CreateTemplate } from '@storybook-utils';
import { Button, ButtonProps } from '.';

export default { component: Button };

const defaultProps: ButtonProps = {
    children: 'КНОПКА',
    variant: 'contained',
    disabled: false,
    loading: false,
    type: 'button',
    size: 'medium',
    // eslint-disable-next-line
    onClick: () => console.info('button clicked'),
};

export const RegularContainedButton = CreateTemplate(Button, defaultProps);

export const RegularOutlinedButton = CreateTemplate(Button, {
    ...defaultProps,
    variant: 'outlined',
});

export const Text = CreateTemplate(Button, {
    ...defaultProps,
    variant: 'text',
});

export const DisabledButton = CreateTemplate(Button, {
    ...defaultProps,
    disabled: true,
});

export const ButtonWithLoadingState = CreateTemplate(Button, {
    ...defaultProps,
    loading: true,
});
