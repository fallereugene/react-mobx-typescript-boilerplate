import React, { useEffect, useState } from 'react';
import MUIAlert, { AlertProps as MUIAlertProps } from '@mui/material/Alert';
import MUITypography from '@mui/material/Typography';
import MUISnackbar from '@mui/material/Snackbar';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { SxProps } from '@/contracts/theme';

export type AlertProps = {
    /**
     * Отображаемый текст
     */
    text: string | JSX.Element | JSX.Element[];
    /**
     * Автоскрытие информационной плашки
     */
    autoHideDuration?: number;
    /**
     * Опциональный заголовок
     */
    header?: string;
    /**
     * Информационная плашка может иметь 4 состояния: warning | error | success | info
     * @default success
     */
    severity?: MUIAlertProps['severity'];
    /**
     * Переданный коллбэк на закрытие информационной плашки
     */
    onClose?(): void;
    /**
     * Переданный коллбэк, который будет отображен как кнопка
     */
    action?: {
        text: string;
        callback(): void;
        variant?: MUIButtonProps['variant'];
    };
    /**
     * Опциональные css стили
     */
    sx?: SxProps;
    /**
     * Признак того, должен ли использоваться компонент как снэкбар
     * @default true
     */
    snack?: boolean;
};

const baseStyles: SxProps = {
    minWidth: '475px',
    '& .MuiAlert-root': {
        width: '100%',
        display: 'flex',
        '& .MuiAlert-message': {
            padding: '8px 70px 8px 0',
        },
        '& .MuiTypography-root': {
            color: 'inherit',
        },
    },
    '& .MuiAlert-message': {
        '& .MuiTypography-root': {
            color: 'inherit',
        },
    },
    '& .MuiButton-root': {
        position: 'absolute',
        top: '7px',
        right: '43px',
        color: 'inherit',
    },
    '& .alert': {
        '&-header': {
            fontWeight: 'bold',
        },
    },
};

/**
 * Компонент представляет собой простую нотификацию и отображается в виде короткого
 * сообщения пользователю.
 */
const Alert: React.FunctionComponent<AlertProps> = (props) => {
    const { sx, text, header, severity, autoHideDuration, onClose, action, snack = true } = props;
    const [timeRemaining, updateTimeRemaining] = useState((autoHideDuration ?? 0) / 1000);

    useEffect(() => {
        autoHideDuration && typeof onClose === 'function' && timeRemaining === 0 && onClose();
    }, [timeRemaining, autoHideDuration, onClose]);

    useEffect(() => {
        const timeoutId = setInterval(() => {
            updateTimeRemaining((prevValue) => prevValue - 1);
        }, 1000);
        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
    }, []);

    const baseAlert = (
        <MUIAlert sx={{ ...baseStyles, ...sx }} onClose={onClose} severity={severity}>
            <MUITypography className="alert alert-header">{header}</MUITypography>
            <MUITypography className="alert alert-content" component="div">
                {text}
            </MUITypography>
            {action && (
                <MUIButton onClick={action.callback} variant={action.variant}>
                    {action.text}
                </MUIButton>
            )}
        </MUIAlert>
    );

    if (snack) {
        return (
            <MUISnackbar open sx={{ ...baseStyles, ...sx }}>
                {baseAlert}
            </MUISnackbar>
        );
    }

    return baseAlert;
};

export { Alert };
