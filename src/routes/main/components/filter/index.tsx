import React from 'react';
import cn from 'classnames';
import MUIButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@components/form';
import { useI18n } from '@/hooks';
import { AVAILABLE_FILTER_VALUES } from '../../constants';
import { styles } from './styles';

type FilterProps = {
    activeFilter: string;
    values: typeof AVAILABLE_FILTER_VALUES;
    onFilterClick(activeFilter: string): void;
};

export const Filter: React.FunctionComponent<FilterProps> = ({ activeFilter, values, onFilterClick }) => {
    const { t } = useI18n();
    return (
        <MUIButtonGroup variant="contained" aria-label="Basic button group" sx={styles}>
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
