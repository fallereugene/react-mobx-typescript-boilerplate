import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MUIGlobalStyles from '@mui/material/GlobalStyles';
import MUIBox from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { Alert } from '@components/alert';
import { useStore, useI18n } from '@/hooks';
import { SxProps } from '@/contracts/theme';
import { globalStyles } from './styles';

export type LayoutProps = React.PropsWithChildren<{}>;

export const rootStyles: SxProps = (theme) => ({
    '& .notify-stack': {
        position: 'fixed',
        top: '50px',
        right: '50px',
        zIndex: '10000 !important',
        '& .MuiSnackbar-root': {
            width: '475px',
            display: 'block',
            position: 'relative',
            marginBottom: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            bottom: '20px',
            top: 'auto',
            left: '50%',
            marginLeft: '-190px',
            '& .MuiSnackbar-root': {
                width: '380px',
                left: 'auto',
                right: 'auto',
            },
        },
    },
});

/**
 * Основной лэйаут приложения
 * Содержит основные части: хэдер/футер приложения, контент, сайдбар, нотификации и т.д.
 */
export const Layout: React.FunctionComponent<LayoutProps> = observer((props) => {
    const { children } = props;
    const theme = useTheme();
    const classes = rootStyles(theme);
    const [languageChangeCounter, updateCounter] = useState(0);
    const { i18n, t } = useI18n();
    const { notifications, removeNotification } = useStore().rootStore;

    return (
        <>
            <MUIGlobalStyles styles={globalStyles} />
            <MUIBox>
                {['ru', 'en'].map((lang, idx) => (
                    <Button
                        key={idx}
                        variant="contained"
                        sx={{ m: 1 }}
                        onClick={() => {
                            updateCounter(languageChangeCounter + 1);
                            i18n.changeLanguage(lang);
                        }}
                        disabled={lang === i18n.resolvedLanguage}
                    >
                        {lang.toUpperCase()}
                    </Button>
                ))}
            </MUIBox>
            <Typography>{t('common.change_language_counter', { count: languageChangeCounter })}</Typography>
            {children}
            <MUIBox sx={classes}>
                <MUIBox className="notify-stack">
                    {notifications.map((item) => {
                        const { header, text, severity, action, id } = item;
                        return (
                            <Alert
                                key={id}
                                severity={severity}
                                header={header}
                                text={text}
                                onClose={() => removeNotification(item)}
                                action={action}
                                autoHideDuration={5000}
                            />
                        );
                    })}
                </MUIBox>
            </MUIBox>
        </>
    );
});
