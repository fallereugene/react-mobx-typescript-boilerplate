import React, { useState } from 'react';
import MUIGlobalStyles from '@mui/material/GlobalStyles';
import MUIBox from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Alert } from '@components/alert';
import { useStore } from '@/hooks';
import { globalStyles, rootStyles } from './styles';

type Props = {};

export type LayoutProps = React.PropsWithChildren<Props>;

/**
 * Main application layout.
 * It contains general parts: header, footer, content, sidebar, notifications etc.
 */
export const Layout: React.FunctionComponent<LayoutProps> = observer((props) => {
    const { children } = props;
    const [languageChangeCounter, updateCounter] = useState(0);
    const { notifications, removeNotification } = useStore().rootStore;
    const { i18n, t } = useTranslation();

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
            <MUIBox sx={rootStyles}>
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
