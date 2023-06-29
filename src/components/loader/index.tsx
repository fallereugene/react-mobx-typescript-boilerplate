import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface ILoaderProps extends CircularProgressProps {
    /**
     * Optional css class name
     */
    className?: string;
    /**
     * @default indeterminate
     */
    variant?: CircularProgressProps['variant'];
}

/**
 * Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.
 * Circular progress
 */
const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
    const { variant = 'indeterminate', className } = props;
    return (
        <Box sx={{ display: 'flex' }} className={className}>
            <CircularProgress variant={variant} />
        </Box>
    );
};

export { Loader };
