import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@/contracts/theme';

export type LoaderProps = CircularProgressProps & {
    /**
     * Опциональный css-класс
     */
    className?: string;
    /**
     * Вариант прогресс-бара
     * @default indeterminate
     */
    variant?: CircularProgressProps['variant'];
    /**
     * Опциональные css-стили
     */
    sx?: SxProps;
};

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
 * Циклический прогресс-бар. Показывается во время загрузки каких-либо данных.
 */
export const Loader: React.FunctionComponent<LoaderProps> = (props) => {
    const { variant = 'indeterminate', sx, className } = props;
    return (
        <Box sx={{ ...baseStyles, ...sx }} className={className}>
            <CircularProgress variant={variant} />
        </Box>
    );
};
