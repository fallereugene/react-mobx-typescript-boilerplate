import React from 'react';
import cn from 'classnames';
import MUIButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@components/form';
import { styles } from './styles';

type FilterProps = {
    activeFilter: string;
    values: readonly string[];
    onFilterClick(activeFilter: string): void;
};

export const Filter: React.FunctionComponent<FilterProps> = ({ activeFilter, values, onFilterClick }) => {
    return (
        <MUIButtonGroup variant="contained" aria-label="Basic button group" sx={styles}>
            {values.map((item) => (
                <Button
                    key={item}
                    className={cn(item === activeFilter && 'active')}
                    onClick={() => onFilterClick(item)}
                >
                    {`${item.charAt(0).toUpperCase()}${item.slice(1)}`}
                </Button>
            ))}
        </MUIButtonGroup>
    );
};
