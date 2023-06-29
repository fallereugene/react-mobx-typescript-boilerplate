import { CreateTemplate } from '../../../.storybook/utils';
import { PopupMessage, IPopupMessageProps } from '.';

export default { component: PopupMessage };

const defaultProps: IPopupMessageProps = {
    message: 'Message text',
    onClose: () => {},
};

export const Normal = CreateTemplate(PopupMessage, defaultProps);

export const WithTitle = CreateTemplate(PopupMessage, { ...defaultProps, header: 'Title' });
