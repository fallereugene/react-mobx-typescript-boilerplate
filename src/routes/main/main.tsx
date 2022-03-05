import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Loader } from '@components/loader';
import { InputControl } from '@components/input';
import { Button } from '@components/button';
import { Alert } from '@components/alert';
import { Task } from './components/task';
import { StoreContext } from '@/index';

export const Main: React.FunctionComponent<{}> = observer(() => {
    const {
        rootStore: { isFetching },
        mainStore: { tasks, init, createTask, deleteTask },
    } = React.useContext(StoreContext);

    const formik = useFormik({
        initialValues: {
            task: '',
        },
        validationSchema: Yup.object({
            task: Yup.string().min(10).required('Must be 10 characters or less'),
        }),
        onSubmit: ({ task }) => {
            createTask(task);
            formik.resetForm();
        },
    });

    React.useEffect(() => {
        init();
    }, [init]);

    if (tasks === null) {
        return (
            <Grid container direction="row" justifyContent="center" alignItems="center" padding={2}>
                <Loader />
            </Grid>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography style={{ marginTop: 20, marginBottom: 20 }} variant="h4">
                ToDo List
            </Typography>
            <Grid container>
                <Grid item xs={11}>
                    <InputControl
                        id="task"
                        name="task"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.task}
                        label="New task"
                        disabled={isFetching}
                    />
                    {formik.touched.task && formik.errors.task && (
                        <Alert text={formik.errors.task} severity="error" sx={{ width: '100%', marginTop: '10px' }} />
                    )}
                </Grid>
                <Grid item alignItems="center" textAlign="right" xs={1}>
                    <Button type="submit" text="Add task" disabled={isFetching} />
                </Grid>
            </Grid>
            <Grid container spacing={2} padding={1} direction="row" alignItems="center">
                {tasks.map((item) => (
                    <Task key={item.id} {...item} onDelete={() => deleteTask(item.id)} disabled={isFetching} />
                ))}
            </Grid>
        </form>
    );
});

export default Main;
