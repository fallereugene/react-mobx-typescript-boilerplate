import React from 'react';
import MUIBox from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { RequestError } from './components/request-error';
import { useStore } from '@/hooks';
import * as resources from '@/locales';

type Props = {};

export type LayoutProps = React.PropsWithChildren<Props>;

/**
 * Main application layout.
 * It contains general parts: header, footer, content, sidebar, notifications etc.
 */
export const Layout: React.FunctionComponent<LayoutProps> = observer((props) => {
    const { children } = props;
    const { requestErrors, removeRequestError } = useStore().rootStore;
    const { i18n } = useTranslation();

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <MUIBox>
                        {Object.keys(resources).map((lang, idx) => (
                            <Button
                                key={idx}
                                variant="contained"
                                sx={{ m: 1 }}
                                onClick={() => i18n.changeLanguage(lang)}
                                disabled={lang === i18n.resolvedLanguage}
                            >
                                {lang.toUpperCase()}
                            </Button>
                        ))}
                    </MUIBox>
                </Grid>
            </Grid>

            {children}
            <RequestError errors={requestErrors} onClose={removeRequestError} />
        </>
    );
});
