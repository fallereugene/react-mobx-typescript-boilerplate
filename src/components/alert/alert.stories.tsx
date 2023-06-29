import { CreateTemplate } from '../../../.storybook/utils';
import { Alert } from '.';

export default { component: Alert };

export const Success = CreateTemplate(Alert, {
    text: 'Alert text',
});

export const Info = CreateTemplate(Alert, {
    text: 'Info text',
    severity: 'info',
});

export const Warning = CreateTemplate(Alert, {
    text: 'Warn text',
    severity: 'warning',
});

export const Error = CreateTemplate(Alert, {
    text: 'Error text',
    severity: 'error',
});
