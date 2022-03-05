import BUIButton, { ButtonProps } from '@mui/material/Button';

interface IButton {
    text?: string;
    disabled?: boolean;
    variant?: ButtonProps['variant'];
    type?: ButtonProps['type'];
    onClick?: ButtonProps['onClick'];
}

const Button: React.FunctionComponent<IButton> = (props) => {
    const { text, variant = 'contained', type, disabled, onClick, children } = props;
    return (
        <BUIButton variant={variant} type={type} onClick={onClick} disabled={disabled}>
            {text || children}
        </BUIButton>
    );
};

export { Button };
