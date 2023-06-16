import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '.';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    text: 'Button text',
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Button text',
    disabled: true,
};
