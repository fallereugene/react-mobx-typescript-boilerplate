import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Task as ITask } from '@services/api/__models/todo';
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

export const Task: React.FunctionComponent<ITaskProps> = ({ title, disabled, onDelete }) => {
    const { t } = useTranslation();
    return (
        <>
            <Grid item xs={10}>
                <Item>{title}</Item>
            </Grid>
            <Grid xs={2} item textAlign="right">
                <Button text={t('common.delete')} onClick={onDelete} disabled={disabled} />
            </Grid>
        </>
    );
};
