import { CreateTemplate } from '../../../.storybook/utils';
import { Button } from '.';

export default { component: Button };

export const Normal = CreateTemplate(Button, {
    text: 'Button text',
    variant: 'contained',
});

export const Disabled = CreateTemplate(Button, {
    text: 'Button text',
    disabled: true,
    variant: 'contained',
});
