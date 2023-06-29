import { Descriptor } from '@components/dynamic-form-generator/contracts';
import { CreateTemplate } from '../../../.storybook/utils';
import { DynamicFormGenerator, BaseFormProps } from '.';

const defaultSchema: Descriptor[] = [
    {
        type: 'input',
        name: 'MessageTemplate',
        options: {
            label: 'input label',
            description: 'input extended description',
            required: true,
            type: 'text',
            min: 6,
        },
    },
];

const defaultProps: BaseFormProps = {
    schema: defaultSchema,
    onSubmit: () => {},
};

export default { component: DynamicFormGenerator };

export const Normal = CreateTemplate(DynamicFormGenerator, {
    ...defaultProps,
});

export const Disabled = CreateTemplate(DynamicFormGenerator, {
    ...defaultProps,
    disabled: true,
});
