import React from 'react';
import { useTheme } from '@mui/material';
import cn from 'classnames';
import MUIButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@components/form';
import { useI18n } from '@/hooks';
import { SxProps } from '@/contracts/theme';
import { AVAILABLE_FILTER_VALUES } from '../../constants';

export const styles: SxProps = (theme) => ({
    margin: '20px 0',
    '& .MuiButtonBase-root': {
        '&.active': {
            cursor: 'default',
            opacity: 0.5,
        },
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        '& .MuiButtonBase-root': {
            width: '100%',
        },
    },
});

type FilterProps = {
    activeFilter: string;
    values: typeof AVAILABLE_FILTER_VALUES;
    onFilterClick(activeFilter: string): void;
};

export const Filter: React.FunctionComponent<FilterProps> = ({ activeFilter, values, onFilterClick }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const classes = styles(theme);

    return (
        <MUIButtonGroup variant="contained" aria-label="Basic button group" sx={classes}>
            {values.map((item) => (
                <Button
                    key={item}
                    className={cn(item === activeFilter && 'active')}
                    onClick={() => onFilterClick(item)}
                >
                    {t(`main.filter_${item}`)}
                </Button>
            ))}
        </MUIButtonGroup>
    );
};
