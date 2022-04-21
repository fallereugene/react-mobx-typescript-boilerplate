import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PopupMessage, IPopupMessageProps } from '.';

export default {
    title: 'Components/PopupMessage',
    component: PopupMessage,
} as ComponentMeta<typeof PopupMessage>;

const Template: ComponentStory<typeof PopupMessage> = (args) => <PopupMessage {...args} />;

export const Normal = Template.bind({});
const normalProps: IPopupMessageProps = {
    message: 'Message text',
    onClose: () => {},
};
Normal.args = normalProps;

export const WithTitle = Template.bind({});
const withTitleProps: IPopupMessageProps = {
    message: 'Message text',
    onClose: () => {},
    header: 'Title',
};
WithTitle.args = withTitleProps;
