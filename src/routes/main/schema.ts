import { Descriptor } from '@components/dynamic-form-generator/contracts';

const schema: Descriptor[] = [
    {
        name: 'task',
        type: 'input',
        options: {
            label: 'Task description',
            description: 'Task description',
            required: true,
            type: 'text',
            min: 6,
        },
    },
];

export { schema };
