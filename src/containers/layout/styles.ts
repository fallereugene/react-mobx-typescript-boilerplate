import { Interpolation, Theme } from '@mui/material/styles';
import { SxProps } from '@/contracts/theme';

export const globalStyles: Interpolation<Theme> = {
    a: {
        textDecoration: 'none',
        color: 'inherit',
    },
    '#root': {
        padding: '0 15px',
    },
};

export const rootStyles: SxProps = {
    display: 'flex',
    maxWidth: 1920,
    margin: 'auto',
    '& .main.MuiBox-root': {
        flexGrow: 1,
        p: 3,
        padding: '50px 75px',
        position: 'relative',
        minHeight: '100vh',
    },
    '& .notify-stack': {
        position: 'fixed',
        top: '50px',
        right: '50px',
        zIndex: '10000 !important',
        '& .MuiSnackbar-root': {
            minWidth: '475px',
            display: 'block',
            position: 'relative',
            marginBottom: '10px',
        },
    },
};
