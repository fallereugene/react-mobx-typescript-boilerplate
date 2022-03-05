import FormGroup from '@mui/material/FormGroup';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type InputProps = { className?: string } & TextFieldProps;

const InputControl: React.FunctionComponent<InputProps> = (props) => {
    const {
        id,
        name,
        className,
        onChange,
        onBlur,
        value,
        size = 'small',
        label = '',
        variant = 'outlined',
        disabled,
    } = props;
    return (
        <FormGroup className={className}>
            <TextField
                id={id}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                size={size}
                label={label}
                variant={variant}
                disabled={disabled}
            />
        </FormGroup>
    );
};

export { InputControl };
