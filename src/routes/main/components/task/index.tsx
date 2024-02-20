import React, { useState } from 'react';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Task as ITask } from '@services/api/__models/task';
import { Checkbox, Button, TextField } from '@components/form';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    '&.completed': {
        opacity: 0.5,
        textDecorationLine: 'line-through',
    },

    '&.MuiPaper-root': {
        width: '100%',
    },
    '& .MuiFormHelperText-root': {
        position: 'absolute',
        bottom: '-21px',
        margin: 0,
    },
}));

type TaskProps = ITask & {
    onChangeTask(task: ITask): void;
    onDelete(): void;
    disabled?: boolean;
};

type FormikProps = {
    title: string;
};

export const Task: React.FunctionComponent<TaskProps> = ({
    title,
    id,
    disabled,
    completed,
    onDelete,
    onChangeTask,
}) => {
    const [isEditing, setState] = useState(false);
    const { t, i18n } = useTranslation();

    const formik = useFormik<FormikProps>({
        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required(() => i18n.t('error.required_field'))
                .min(6, ({ min }) => i18n.t('error.min_symbols', { symbols: min })),
        }),
        onSubmit(data) {
            setState(false);
            onChangeTask({
                id,
                completed,
                ...data,
            });
        },
    });

    return (
        <>
            <Grid item xs={9} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    checked={completed}
                    onChange={() =>
                        onChangeTask({
                            title,
                            id,
                            completed: !completed,
                        })
                    }
                />
                <Item className={cn(completed && 'completed')}>
                    {isEditing ? (
                        <TextField
                            name="title"
                            size="small"
                            value={formik.values.title}
                            helperText={(formik.touched.title && formik.errors.title) || t('main.enter_task_name')}
                            onChange={formik.handleChange}
                            error={formik.touched.title && !!formik.errors.title}
                            autoFocus
                            fullWidth
                        />
                    ) : (
                        title
                    )}
                </Item>
            </Grid>
            <Grid xs={3} item textAlign="right" style={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    text={t(isEditing ? 'common.confirm' : 'common.edit')}
                    onClick={() => {
                        if (isEditing) {
                            formik.handleSubmit();
                            return;
                        }
                        formik.setFieldValue('title', title);
                        setState(true);
                    }}
                    disabled={disabled || completed}
                />
                <Button text={t('common.delete')} onClick={onDelete} disabled={disabled} sx={{ marginLeft: '5px' }} />
            </Grid>
        </>
    );
};
