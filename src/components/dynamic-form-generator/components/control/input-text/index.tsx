import FormGroup from '@mui/material/FormGroup';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ControlProps } from '../../../contracts';

type InputProps = ControlProps & { className?: string } & TextFieldProps;

/**
 * Поле ввода input
 * @param props
 * @returns
 */
const InputText: React.FunctionComponent<InputProps> = (props) => {
    const {
        name,
        className,
        onChange,
        onBlur,
        value,
        size = 'small',
        label = '',
        variant = 'outlined',
        disabled,
        errorText,
        prompt,
    } = props;

    return (
        <FormGroup className={className}>
            <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                size={size}
                label={label}
                variant={variant}
                disabled={disabled}
                helperText={errorText || prompt}
            />
        </FormGroup>
    );
};

export { InputText };
