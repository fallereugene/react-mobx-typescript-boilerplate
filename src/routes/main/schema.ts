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

// schema example
// const schema: Descriptor[] = [
//     {
//         name: 'Enabled',
//         type: 'checkbox',
//         options: {
//             label: 'Enable password reset',
//             description: 'Enable or disable password reset.',
//         },
//     },
//     {
//         name: 'ForceReset',
//         type: 'checkbox',
//         options: {
//             label: 'Force password reset',
//             description: 'Force password reset.',
//         },
//     },
//     {
//         element: 'separator',
//         options: {
//             title: 'Description for separator',
//         },
//     },
//     {
//         type: 'input',
//         name: 'PasswordGeneratorType',
//         options: {
//             label: 'Password generator type',
//             description: 'Password generator type.',
//             required: true,
//             type: 'text',
//         },
//     },
//     {
//         type: 'input',
//         name: 'MessageTemplate',
//         options: {
// label: 'Message template',
// description: 'Message template.',
// required: true,
// type: 'text',
// min: 6,
//         },
//     },
// ];

export { schema };
