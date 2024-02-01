import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@components/form';
import { Task } from './components/task';
import { useApi } from '@/hooks';

export type FormikProps = {
    title: string;
};

export const Main: React.FunctionComponent<{}> = () => {
    const { t, i18n } = useTranslation();
    const { getList, resultData: tasks } = useApi('todo', 'getList');
    const { createTask, fetchingState: createTaskState, fetchStates } = useApi('todo', 'createTask');
    const { deleteTask, fetchingState: deleteTaskState } = useApi('todo', 'deleteTask');

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
            createTask(data);
        },
    });

    React.useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        createTaskState === fetchStates.Success && getList();
    }, [getList, createTaskState, fetchStates.Success]);

    useEffect(() => {
        deleteTaskState === fetchStates.Success && getList();
    }, [getList, deleteTaskState, fetchStates.Success]);

    return (
        <>
            <Typography style={{ marginTop: 20, marginBottom: 20 }} variant="h4">
                {t('main.project_name')}
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            name="title"
                            size="small"
                            value={formik.values.title}
                            label={t('control.main_input_label')}
                            onChange={formik.handleChange}
                            error={formik.touched.title && !!formik.errors.title}
                            helperText={(formik.touched.title && formik.errors.title) || t('main.enter_task_name')}
                            fullWidth
                        />
                        <Button onClick={() => formik.handleSubmit()}>{t('common.confirm')}</Button>
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={2} padding={1} direction="row" alignItems="center">
                {tasks &&
                    tasks.map((item) => (
                        <Task
                            key={item.id}
                            onDelete={() => deleteTask(item.id)}
                            disabled={[deleteTaskState, createTaskState].includes(fetchStates.Fetching)}
                            {...item}
                        />
                    ))}
            </Grid>
        </>
    );
};

export default Main;
