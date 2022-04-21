import { createTheme } from '@mui/material/styles';

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
