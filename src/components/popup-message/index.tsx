import React from 'react';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

export interface IPopupMessageProps {
    /**
     * Displayed message
     */
    message: string;
    /**
     * Optional css classname
     */
    className?: string;
    /**
     * Optional header
     */
    header?: string;
    /**
     * Close callback
     */
    onClose(): void;
    /**
     * The alert offers four severity levels that set a distinctive icon and color.
     * @default info
     */
    severity?: AlertProps['severity'];
}

/**
 * Component provides brief notifications. The component is also known as a toast.
 */
const PopupMessage: React.FunctionComponent<IPopupMessageProps> = (props) => {
    const { message, className, onClose, header, severity = 'info' } = props;
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
