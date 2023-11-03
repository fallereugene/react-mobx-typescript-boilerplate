import React from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CssBaseline from '@mui/material/CssBaseline';
import { Loader } from '@components/loader';
import { Layout } from '../layout';
import { RootState } from './constants';
import { useStore } from '@/hooks';
import { getRoutes } from './routes';

const Root: React.FunctionComponent<{}> = () => {
    const store = useStore();
    const { state, init } = store.rootStore;
    const routing = useRoutes(getRoutes(store));

    React.useEffect(() => {
        init();
    }, [init]);

    const applicationState = (() => {
        switch (state) {
            case RootState.Initialization:
                return <Loader />;
            case RootState.Initialized:
                return <Layout>{routing}</Layout>;
            case RootState.InitializationError:
            default:
                return null;
        }
    })();

    return (
        <>
            <CssBaseline /> {/* apply normalize.css */}
            {applicationState}
        </>
    );
};

export default observer(Root);
