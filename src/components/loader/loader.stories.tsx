import { CreateTemplate } from '../../../.storybook/utils';
import { Loader, ILoaderProps } from '.';

export default { component: Loader };

const defaultProps: ILoaderProps = {
    variant: 'indeterminate',
    color: 'primary',
};

export const Normal = CreateTemplate(Loader, defaultProps);
