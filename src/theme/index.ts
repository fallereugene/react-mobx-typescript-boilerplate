import { createTheme } from '@mui/material/styles';
import '@/assets/styles/main.scss';

const theme = createTheme({
    palette: {},
    typography: {},
    components: {
        MuiButton: {
            styleOverrides: {
                root: {},
            },
        },
    },
});

export default theme;
