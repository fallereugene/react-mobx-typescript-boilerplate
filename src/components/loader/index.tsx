import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@/contracts/theme';

export interface ILoaderProps extends CircularProgressProps {
    /**
     * Optional css class name
     */
    className?: string;
    /**
     * @default indeterminate
     */
    variant?: CircularProgressProps['variant'];
    /**
     * The `sx` prop is a shortcut for defining custom style that has access to the theme.
     */
    sx?: SxProps;
}

const baseStyles: SxProps = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

/**
 * Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.
 * Circular progress
 */
const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
    const { variant = 'indeterminate', sx, className } = props;
    return (
        <Box sx={{ ...baseStyles, ...sx }} className={className}>
            <CircularProgress variant={variant} />
        </Box>
    );
};

export { Loader };
