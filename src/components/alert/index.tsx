import React from 'react';
import MUIAlert, { AlertProps } from '@mui/material/Alert';
import Stack, { StackProps } from '@mui/material/Stack';

interface IAlert {
    /**
     * Displayed text
     */
    text: string;
    /**
     * Optional css class name
     */
    className?: string;
    /**
     * The alert offers four severity levels that set a distinctive icon and color.
     * @default success
     */
    severity?: AlertProps['severity'];
    /**
     * The `sx` prop is a shortcut for defining custom style that has access to the theme.
     */
    sx?: StackProps['sx'];
    /**
     * A wide range of shorthand responsive margin and padding utility classes to modify an element's appearance.
     */
    spacing?: StackProps['spacing'];
}

/**
 * An alert displays a short, important message in a way that
 * attracts the user's attention without interrupting the user's task.
 */
const Alert: React.FunctionComponent<IAlert> = (props) => {
    const { text, severity = 'success', className, sx, spacing } = props;
    return (
        <Stack className={className} sx={sx} spacing={spacing}>
            <MUIAlert severity={severity}>{text}</MUIAlert>
        </Stack>
    );
};

export { Alert };
