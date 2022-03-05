import MUIAlert, { AlertProps } from '@mui/material/Alert';
import Stack, { StackProps } from '@mui/material/Stack';

interface IAlert {
    text: string;
    className?: string;
    severity?: AlertProps['severity'];
    sx?: StackProps['sx'];
    spacing?: StackProps['spacing'];
}

const Alert: React.FunctionComponent<IAlert> = (props) => {
    const { text, severity = 'success', className, sx, spacing } = props;
    return (
        <Stack className={className} sx={sx} spacing={spacing}>
            <MUIAlert severity={severity}>{text}</MUIAlert>
        </Stack>
    );
};

export { Alert };
