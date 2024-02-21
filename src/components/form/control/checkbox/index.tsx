import React from 'react';
import MUICheckbox, { CheckboxProps as MUICheckboxProps } from '@mui/material/Checkbox';
import MUIFormControlLabel, { FormControlLabelProps as MUIFormControlLabelProps } from '@mui/material/FormControlLabel';
import MUIFormHelperText, { FormHelperTextProps as MUIFormHelperTextProps } from '@mui/material/FormHelperText';

export type CheckboxProps = {
    /**
     * Лейбл элемента
     */
    label?: MUIFormControlLabelProps['label'];
    /**
     * Имя контрола
     */
    name?: MUICheckboxProps['name'];
    /**
     * Признак, выбран ли чекбокс
     * @default false
     */
    checked?: MUICheckboxProps['checked'];
    /**
     * Признак активности/неактивности
     * @default false
     */
    disabled?: MUICheckboxProps['disabled'];
    /**
     * Подсказка
     */
    text?: MUIFormHelperTextProps['children'];
    /**
     * Обработчики событий
     */
    onChange?: MUICheckboxProps['onChange'];
};

/**
 * Компонент чекбокса
 */
export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
    label,
    name,
    checked,
    disabled,
    text,
    onChange,
}) => {
    const Checkbox = (
        <MUICheckbox
            aria-label="is-complete-sign"
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
        />
    );
    const additionalText = text && <MUIFormHelperText>{text}</MUIFormHelperText>;

    if (label) {
        return (
            <>
                <MUIFormControlLabel label={label} control={Checkbox} />
                {additionalText}
            </>
        );
    }

    return (
        <>
            {Checkbox}
            {additionalText}
        </>
    );
};
