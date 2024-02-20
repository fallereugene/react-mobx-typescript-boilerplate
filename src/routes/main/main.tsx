import React, { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField } from '@components/form';
import { Task as ITask } from '@services/api/__models/task';
import { Task } from './components/task';
import { Filter } from './components/filter';
import { AVAILABLE_FILTER_VALUES } from './constants';
import { useApi, useQueryParams } from '@/hooks';

export type FormikProps = {
    title: string;
};

export const Main: React.FunctionComponent<{}> = () => {
    const { t, i18n } = useTranslation();
    const filterMap: { [P in (typeof AVAILABLE_FILTER_VALUES)[number]]: (task: ITask) => boolean } = useMemo(
        () => ({
            all: () => true,
            active: (task) => !task.completed,
            completed: (task) => task.completed,
        }),
        [],
    );
    const { add, params } = useQueryParams({ filter: useQueryParams.types.StringParam });
    const { getList, resultData: tasks } = useApi('task', 'getList');
    const { createTask, fetchingState: createTaskState, fetchStates } = useApi('task', 'createTask');
    const { deleteTask, fetchingState: deleteTaskState } = useApi('task', 'deleteTask');
    const { changeTask, fetchingState: changeTaskState } = useApi('task', 'changeTask');

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
        !params.filter && add({ filter: AVAILABLE_FILTER_VALUES[0] });
    }, [params.filter, add]);

    useEffect(() => {
        createTaskState === fetchStates.Success && getList();
        formik.resetForm();
    }, [getList, createTaskState, fetchStates.Success]);

    useEffect(() => {
        deleteTaskState === fetchStates.Success && getList();
    }, [getList, deleteTaskState, fetchStates.Success]);

    useEffect(() => {
        changeTaskState === fetchStates.Success && getList();
    }, [getList, changeTaskState, fetchStates.Success]);

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
                    </form>
                </Grid>
                <Filter
                    values={AVAILABLE_FILTER_VALUES}
                    activeFilter={params.filter ?? AVAILABLE_FILTER_VALUES[0]}
                    onFilterClick={(filter: (typeof AVAILABLE_FILTER_VALUES)[number]) => add({ filter })}
                />
            </Grid>
            <Grid container spacing={2} padding={1} direction="row" alignItems="center">
                {tasks &&
                    tasks
                        .filter(filterMap[params.filter as (typeof AVAILABLE_FILTER_VALUES)[number]] ?? filterMap.all)
                        .map((item) => (
                            <Task
                                key={item.id}
                                onDelete={() => deleteTask(item.id)}
                                onChangeTask={(data: ITask) => changeTask(item.id, data)}
                                disabled={[deleteTaskState, createTaskState, changeTaskState].includes(
                                    fetchStates.Fetching,
                                )}
                                {...item}
                            />
                        ))}
            </Grid>
        </>
    );
};
