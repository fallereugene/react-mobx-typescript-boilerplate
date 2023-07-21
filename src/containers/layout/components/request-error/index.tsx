import React from 'react';
import { PopupMessage } from '@/components/popup-message';

export interface IRequestError {
    errors: string[];
    onClose(error: string): void;
    className?: string;
}

export const RequestError: React.FunctionComponent<IRequestError> = (props) => {
    const { errors, className, onClose } = props;
    const error = errors[errors.length - 1];
    if (!error) {
        return null;
    }
    return (
        <PopupMessage
            className={className}
            message={error}
            onClose={() => onClose(error)}
            severity="error"
            header="Something went wrong"
        />
    );
};
