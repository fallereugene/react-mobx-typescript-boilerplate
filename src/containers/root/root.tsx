import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Loader } from '@components/loader';
import { Layout } from '@components/layout';
import { Main } from '@routes/main';
import { NotFound } from '@routes/not-found';
import localization, { Localization } from '@services/localization';
import { Routes as ClientRoutes } from '@/constants';
import { RequestError } from './components/request-error';
import { RootState } from './constants';
import { StoreContext } from '@/index';

const Root: React.FunctionComponent<{}> = observer(() => {
    const {
        rootStore: { state, setState, requestErrors, removeRequestError },
    } = React.useContext(StoreContext);

    const { i18n } = useTranslation();

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
                <CssBaseline /> {/* apply normalize.css */}
                {Localization.getLanguagesList().map((lang, idx) => (
                    <Button
                        key={idx}
                        variant="contained"
                        sx={{ m: 1 }}
                        onClick={() => i18n.changeLanguage(lang)}
                        disabled={lang === localization.getCurrentLanguage()}
                    >
                        {lang.toUpperCase()}
                    </Button>
                ))}
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
