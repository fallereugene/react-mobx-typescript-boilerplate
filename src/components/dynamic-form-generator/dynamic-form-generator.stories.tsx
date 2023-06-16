import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Descriptor } from '@components/dynamic-form-generator/contracts';
import { DynamicFormGenerator } from '.';

const defaultSchema: Descriptor[] = [
    {
        type: 'input',
        name: 'MessageTemplate',
        options: {
            label: 'Message template',
            description: 'Message template.',
            required: true,
            type: 'text',
            min: 6,
        },
    },
];

export default {
    title: 'Components/DynamicFormGenerator',
    component: DynamicFormGenerator,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DynamicFormGenerator>;

const Template: ComponentStory<typeof DynamicFormGenerator> = (args) => <DynamicFormGenerator {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    schema: defaultSchema,
};

export const InputControl = Template.bind({});
InputControl.args = {
    schema: defaultSchema,
};

export const Disabled = Template.bind({});
Disabled.args = {
    schema: defaultSchema,
    disabled: true,
};
