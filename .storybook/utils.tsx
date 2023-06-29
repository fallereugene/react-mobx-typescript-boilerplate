import React from 'react';
import type { StoryObj } from '@storybook/react';

export const CreateTemplate = <P extends {}>(Component: React.ComponentType<P>, props?: P) => {
    const ComponentTemplate: StoryObj<typeof Component> = { args: { ...props } };
    return ComponentTemplate;
};
