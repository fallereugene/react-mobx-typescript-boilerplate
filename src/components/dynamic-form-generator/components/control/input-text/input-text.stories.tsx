import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputText, InputProps } from '.';

export default {
    title: 'Components/DynamicFormGenerator/Control/InputText',
    component: InputText,
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args: InputProps) => <InputText {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    disabled: false,
    errorText: '',
    label: 'Message template',
    name: '',
    onBlur: () => {},
    onChange: () => {},
    prompt: '',
    type: 'text',
    value: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    errorText: '',
    label: 'Message template',
    name: '',
    onBlur: () => {},
    onChange: () => {},
    prompt: '',
    type: 'text',
    value: 'With default value',
};

export const WithErrorText = Template.bind({});
WithErrorText.args = {
    errorText: 'With error text',
    label: 'Message template',
    name: '',
    onBlur: () => {},
    onChange: () => {},
    prompt: '',
    type: 'text',
    value: '',
};

export const WithPrompt = Template.bind({});
WithPrompt.args = {
    errorText: '',
    label: 'Message template',
    name: '',
    onBlur: () => {},
    onChange: () => {},
    prompt: 'With any prompt',
    type: 'text',
    value: '',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
    errorText: '',
    label: 'label',
    name: '',
    onBlur: () => {},
    onChange: () => {},
    prompt: '',
    type: 'text',
    value: 'With default value',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    errorText: '',
    label: 'With label',
    name: '',
    onBlur: () => {},
    onChange: () => {},
    prompt: '',
    type: 'text',
    value: '',
};
