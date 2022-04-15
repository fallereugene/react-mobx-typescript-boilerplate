import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DynamicFormGenerator } from '@components/dynamic-form-generator';
import { Loader } from '@components/loader';
import { Task } from './components/task';
import { StoreContext } from '@/index';
import { schema } from './schema';

export const Main: React.FunctionComponent<{}> = observer(() => {
    const {
        rootStore: { isFetching },
        mainStore: { tasks, init, deleteTask, createTask },
    } = React.useContext(StoreContext);

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
        <>
            <Typography style={{ marginTop: 20, marginBottom: 20 }} variant="h4">
                ToDo List
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    <DynamicFormGenerator
                        schema={schema}
                        // model example
                        // getModel={() =>
                        //     Promise.resolve({
                        //         Enabled: true,
                        //         ForceReset: false,
                        //         PasswordGeneratorType: 'password generator type',
                        //         MessageTemplate: 'any template',
                        //     })
                        // }
                        onSubmit={(data: { task: string }) => {
                            createTask(data.task);
                        }}
                        disabled={isFetching}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} padding={1} direction="row" alignItems="center">
                {tasks.map((item) => (
                    <Task key={item.id} {...item} onDelete={() => deleteTask(item.id)} disabled={isFetching} />
                ))}
            </Grid>
        </>
    );
});

export default Main;
