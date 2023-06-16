import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ITask } from '@services/api/contracts';
import { Button } from '@components/button';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));

interface ITaskProps extends ITask {
    onDelete(): void;
    disabled?: boolean;
}

const Task: React.FunctionComponent<ITaskProps> = ({ title, disabled, onDelete }) => {
    return (
        <>
            <Grid item xs={10}>
                <Item>{title}</Item>
            </Grid>
            <Grid xs={2} item textAlign="right">
                <Button text="Delete" onClick={onDelete} disabled={disabled} />
            </Grid>
        </>
    );
};

export { Task };
