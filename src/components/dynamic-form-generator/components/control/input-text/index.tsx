import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ControlProps } from '../../../contracts';

export type InputProps = ControlProps & {
    /**
     * Optional css class name
     */
    className?: string;
    /**
     * The TextField wrapper component is a complete form control including a label, input, and help text.
     * It comes with three variants: outlined (default), filled, and standard.
     * @default outlined
     */
    variant?: TextFieldProps['variant'];
    /**
     * Size property
     * @default small
     */
    size?: TextFieldProps['size'];
    /**
     * Enable/disable sign
     * @default false
     */
    disabled?: TextFieldProps['disabled'];
};

/**
 * Input control for type=text
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
        disabled = false,
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
