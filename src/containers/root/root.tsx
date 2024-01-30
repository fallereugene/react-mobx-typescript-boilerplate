import React from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CssBaseline from '@mui/material/CssBaseline';
import { Loader } from '@components/loader';
import { Layout } from '../layout';
import { RootState } from './constants';
import { useStore } from '@/hooks';
import { getRoutes } from './routes';

const Root: React.FunctionComponent<{}> = observer(() => {
    const store = useStore();
    const { state, init } = store.rootStore;
    const routing = useRoutes(getRoutes(store));

    React.useEffect(() => {
        init();
    }, [init]);
    return (
        <>
            <CssBaseline /> {/* apply normalize.css */}
            {state === RootState.Initialization ? <Loader /> : <Layout>{routing}</Layout>}
        </>
    );
});

export default Root;
