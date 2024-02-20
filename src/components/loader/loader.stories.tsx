import { CreateTemplate } from '../../../.storybook/utils';
import { Loader, LoaderProps } from '.';

export default { component: Loader };

const defaultProps: LoaderProps = {
    variant: 'indeterminate',
    color: 'primary',
};

export const Normal = CreateTemplate(Loader, defaultProps);
