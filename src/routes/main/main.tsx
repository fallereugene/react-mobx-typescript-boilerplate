import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DynamicFormGenerator } from '@components/dynamic-form-generator';
import { Loader } from '@components/loader';
import { Task } from './components/task';
import { schema } from './schema';
import { useGettingTasks, useDeleteTask, useCreateTask } from './hooks';

export const Main: React.FunctionComponent<{}> = () => {
    const { t, i18n } = useTranslation();
    const { isLoading, data: taskList } = useGettingTasks();
    const { mutate: deleteTask, status: deleteTaskStatus } = useDeleteTask();
    const { mutate: createTask, status: createTaskStatus } = useCreateTask();

    if (isLoading) {
        return (
            <Grid container direction="row" justifyContent="center" alignItems="center" padding={2}>
                <Loader />
            </Grid>
        );
    }

    return (
        <>
            <Typography style={{ marginTop: 20, marginBottom: 20 }} variant="h4">
                {t('main:project_name')}
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography style={{ marginTop: 20, marginBottom: 20 }} variant="h6">
                        {t('main:enter_task_name')}
                    </Typography>
                    <DynamicFormGenerator
                        schema={schema}
                        currentLocale={i18n.language}
                        onSubmit={(data: { task: string }) => createTask(data.task)}
                        disabled={createTaskStatus === 'pending'}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} padding={1} direction="row" alignItems="center">
                {taskList?.map((item) => (
                    <Task
                        key={item.id}
                        {...item}
                        onDelete={() => deleteTask(item.id)}
                        disabled={deleteTaskStatus === 'pending'}
                    />
                ))}
            </Grid>
        </>
    );
};

export default Main;
