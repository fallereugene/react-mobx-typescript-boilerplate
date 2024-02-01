import React from 'react';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import MUIInputAdornment, { InputAdornmentProps as MUIInputAdornmentProps } from '@mui/material/InputAdornment';
import { sx } from './styles';

export type TextFieldProps = {
    /**
     * Лейбл поля ввода
     */
    label?: string;
    /**
     * Имя поля
     */
    name?: MUITextFieldProps['name'];
    /**
     * Известные типы инпута
     */
    type?: 'text' | 'email' | 'number' | 'password' | 'url' | 'tel' | 'search' | 'date';
    /**
     * Значение по умолчанию. Рекомендуется для контролируемого компонента.
     */
    value?: string;
    /**
     * Вариант использования компонента.
     * @default outlined
     */
    variant?: 'filled' | 'outlined';
    /**
     * Признак мультистрочности.
     * В случае, если признак передан в true, рендериться будет textarea вместо input type="text".
     * @default false
     */
    multiline?: MUITextFieldProps['multiline'];
    /**
     * Размер элемента
     * @default medium
     */
    size?: MUITextFieldProps['size'];
    /**
     * Признак активности/неактивности.
     * @default false
     */
    disabled?: MUITextFieldProps['disabled'];
    /**
     * Короткий текст, отображаемый в текстовом поле до того, как пользователь начнет что-либо вводить.
     */
    placeholder?: MUITextFieldProps['placeholder'];
    /**
     * Текст-подсказка, отображаемая внизу текстового поля.
     */
    helperText?: string | JSX.Element;
    /**
     * Признак наличия/отсутствия ошибки.
     * @default false
     */
    error?: MUITextFieldProps['error'];
    /**
     * Текст префикс вначале или в конце поля ввода
     */
    adornment?: string | React.ReactElement;
    /**
     * Позиция (префиксная или постфиксная)
     */
    adornmentPosition?: MUIInputAdornmentProps['position'];
    /**
     * Признак необходимости всегда показывать префикс/постфикс
     * Если передан false, то префикс/постфикс будет показываться в случае наличия значения в
     * поле ввода
     * @default true
     */
    alwaysShowAdornment?: boolean;
    /**
     * Признак полноширинного размера компонента.
     * Если передано true, то текстовое поле будет заниматься всю ширину родительского контейнера
     * @default false
     */
    fullWidth?: MUITextFieldProps['fullWidth'];
    /**
     * Признак автофокуса.
     * Если передано true, то элемент автоматически получает фокус при маунте компонента в DOM.
     * @default false
     */
    autoFocus?: MUITextFieldProps['autoFocus'];
    /**
     * Признак необходимости скрывать label.
     * Не забывать добавлять aria-label к элементу ввода
     * @default false
     */
    hiddenLabel?: MUITextFieldProps['hiddenLabel'];
    /**
     * Признак фокуса.
     * Если значение передано в true, то элемент будет отображаться в соответствующем состоянии.
     */
    focused?: MUITextFieldProps['focused'];
    /**
     * Props applied to the Input element.
     * It will be a [`FilledInput`](/api/filled-input/),
     * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
     * component depending on the `variant` prop value.
     */
    InputProps?: MUITextFieldProps['InputProps'];
    /**
     * Ссылка на сам компонент
     */
    fieldRef?: MUITextFieldProps['ref'];
    /**
     * Ссылка на поле ввода компонента
     */
    inputRef?: MUITextFieldProps['inputRef'];
    /**
     * Опциональные стили, переопределяющие дефолтные
     */
    sx?: MUITextFieldProps['sx'];
    /**
     * Обработчики событий
     * @param {object} event The event source of the callback.
     */
    onClick?: MUITextFieldProps['onClick'];
    onChange?: MUITextFieldProps['onChange'];
    onFocus?: MUITextFieldProps['onFocus'];
    onBlur?: MUITextFieldProps['onBlur'];
    onKeyDown?: MUITextFieldProps['onKeyDown'];
};

/**
 * Компонент текстового поля ввода
 */
export const TextField: React.FunctionComponent<TextFieldProps> = ({
    size = 'medium',
    adornment,
    adornmentPosition,
    alwaysShowAdornment = true,
    focused,
    autoFocus,
    hiddenLabel,
    InputProps,
    fieldRef,
    inputRef,
    ...restProps
}) => {
    const getInputProps = () => {
        if (InputProps) {
            return InputProps;
        }

        if (!adornment || (!alwaysShowAdornment && !restProps.value)) {
            return undefined;
        }

        const position = adornmentPosition ?? 'start';
        const InputAdornmentComponent = <MUIInputAdornment position={position}>{adornment}</MUIInputAdornment>;
        const key = position === 'end' ? 'endAdornment' : 'startAdornment';

        return {
            [key]: InputAdornmentComponent,
        };
    };

    const textField = (props: TextFieldProps) => (
        <MUITextField
            {...props}
            ref={fieldRef}
            inputRef={inputRef}
            size={size}
            disabled={restProps.disabled}
            focused={focused}
            autoFocus={autoFocus}
            hiddenLabel={hiddenLabel}
            autoComplete="off"
            InputProps={getInputProps()}
            sx={sx}
        />
    );

    return textField({
        ...restProps,
    });
};
