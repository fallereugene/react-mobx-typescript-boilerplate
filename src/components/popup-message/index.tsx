import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

export interface IPopupMessageProps {
    message: string;
    className?: string;
    header?: string;
    isError?: boolean;
    onClose(): void;
    severity?: AlertProps['severity'];
}

const PopupMessage: React.FunctionComponent<IPopupMessageProps> = ({
    message,
    className,
    onClose,
    header,
    severity = 'info',
}) => {
    return (
        <Snackbar
            open
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            className={className}
        >
            <Alert onClose={onClose} severity={severity}>
                <Typography style={{ fontWeight: 600 }} component="div">
                    {header}
                </Typography>
                <Typography component="div">{message}</Typography>
            </Alert>
        </Snackbar>
    );
};

export { PopupMessage };
