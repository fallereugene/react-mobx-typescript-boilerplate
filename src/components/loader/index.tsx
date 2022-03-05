import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader: React.FunctionComponent<{}> = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
};

export { Loader };
