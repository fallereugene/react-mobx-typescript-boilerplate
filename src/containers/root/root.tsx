import React, { useCallback, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CssBaseline from '@mui/material/CssBaseline';
import { Loader } from '@components/loader';
import { Layout } from '../layout';
import { RootState } from './constants';
import { useStore } from '@/hooks';
import { getRoutes } from './routes';

export const Root: React.FunctionComponent<{}> = observer(() => {
    const store = useStore();
    const { eventBus, logger } = store;
    const { state, init } = store.rootStore;
    const routing = useRoutes(getRoutes(store));

    const eventHandler = useCallback(
        ({ id }: { id: string }) => {
            logger.info(`Deleted item`, `Item with id ${id} was deleted successfully.`);
        },
        [logger],
    );

    useEffect(() => {
        init();
        eventBus.on('known_event_name', (data) => {
            eventHandler(data);
        });
        return () => {
            eventBus.off('known_event_name', eventHandler);
        };
    }, [eventBus, eventHandler, init]);

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
            <CssBaseline />
            {applicationState}
        </>
    );
});
