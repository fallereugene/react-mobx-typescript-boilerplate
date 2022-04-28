import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Layout: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
};

export { Layout };
