import React from 'react';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import MUIInputAdornment, { InputAdornmentProps as MUIInputAdornmentProps } from '@mui/material/InputAdornment';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

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
    value?: InputMaskProps['value'];
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
     * Маска ввода:
     * * `9`: `0-9`
     * * `a`: `A-Z, a-z`
     * * `\*`: `A-Z, a-z, 0-9`
     * Любой символ может быть разделен бэкслэшем.
     * Например, в случае нередактируемых/неудаляемых символов, маска может иметь следующий вид:
     *  `mask="+4\\9 99 999 99"` or `mask={"+4\\\\9 99 999 99"}`
     */
    mask?: InputMaskProps['mask'];
    /**
     * Переданное регулярное выражение, в разрезе которого  проверяется введенная строка.
     * В случае, если введенное значение не удовлетворяет регулярному выражению,
     * переданный коллбэк onChange не будет вызван
     */
    pattern?: RegExp;
    /**
     * Символы, которыми будет заполняться невведенное пользователем значение при использовании маски.
     * Заполняются только редактируемые символы. Дефолтное значение - "_".
     * Character to cover unfilled editable parts of mask. Default character is "_".
     * Если значение установлено в null, то незаполненные части маски останутся пустыми как при обычном поле ввода.
     */
    maskChar?: InputMaskProps['maskChar'];
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
    mask,
    maskChar,
    pattern,
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
        />
    );

    if (mask && !pattern) {
        return (
            <InputMask {...restProps} mask={mask} maskChar={maskChar}>
                {textField as any}
            </InputMask>
        );
    }

    return textField({
        ...restProps,
        onChange: (e) => {
            if (e.target.value && pattern) {
                if (pattern.test(e.target.value)) {
                    restProps.onChange && restProps.onChange(e);
                }
                return;
            }
            restProps.onChange && restProps.onChange(e);
        },
    });
};
