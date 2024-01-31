import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DynamicFormGenerator } from '@components/dynamic-form-generator';
import { Task } from './components/task';
import { schema } from './schema';
import { useApi } from '@/hooks';

export type FormikProps = {
    title: string;
};

export const Main: React.FunctionComponent<{}> = () => {
    const { t, i18n } = useTranslation();
    const { getList, resultData: tasks } = useApi('todo', 'getList');
    const { createTask, fetchingState: createTaskState, fetchStates } = useApi('todo', 'createTask');
    const { deleteTask, fetchingState: deleteTaskState } = useApi('todo', 'deleteTask');

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
                    <Typography style={{ marginTop: 20, marginBottom: 20 }} variant="h6">
                        {t('main.enter_task_name')}
                    </Typography>
                    <DynamicFormGenerator
                        schema={schema}
                        currentLocale={i18n.language}
                        onSubmit={(data: { task: string }) => createTask({ title: data.task })}
                        disabled={[deleteTaskState, createTaskState].includes(fetchStates.Fetching)}
                    />
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
