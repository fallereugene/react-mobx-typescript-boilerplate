import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import { Loader } from '@components/loader';
import { Layout } from '@components/layout';
import { Main } from '@routes/main';
import { NotFound } from '@routes/not-found';
import { Routes as ClientRoutes } from '@/constants';
import { RequestError } from './components/request-error';
import { RootState } from './constants';
import { StoreContext } from '@/index';

const Root: React.FunctionComponent<{}> = observer(() => {
    const {
        rootStore: { state, setState, requestErrors, removeRequestError },
    } = React.useContext(StoreContext);

    React.useEffect(() => {
        setState(RootState.Initialized);
        // eslint-disable-next-line
    }, []);

    if (state === RootState.Initialization) {
        return (
            <Grid container direction="row" justifyContent="center" alignItems="center" padding={2}>
                <Loader />
            </Grid>
        );
    }
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={ClientRoutes.ROOT} element={<Main />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
            <RequestError errors={requestErrors} onClose={removeRequestError} />
        </BrowserRouter>
    );
});

export default Root;
