import React from 'react';
import BUIButton, { ButtonProps } from '@mui/material/Button';

interface IButton {
    /**
     * Text for button
     */
    text?: string;
    /**
     * Enable/disable sign
     */
    disabled?: boolean;
    /**
     * Variant
     */
    variant?: ButtonProps['variant'];
    /**
     * Button type
     */
    type?: ButtonProps['type'];
    /**
     * Optional click handler
     */
    onClick?: ButtonProps['onClick'];
}

type ButtonComponentProps = React.PropsWithChildren<IButton>;

/**
 * Primary button component for user interaction
 */
const Button: React.FunctionComponent<ButtonComponentProps> = (props) => {
    const { text, variant = 'contained', type, disabled, onClick, children } = props;
    return (
        <BUIButton variant={variant} type={type} onClick={onClick} disabled={disabled}>
            {text || children}
        </BUIButton>
    );
};

export { Button };
