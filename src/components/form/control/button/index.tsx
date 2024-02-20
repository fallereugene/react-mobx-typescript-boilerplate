import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export type ButtonProps = React.PropsWithChildren<{
    /**
     * Текст кнопки
     */
    text?: string;
    /**
     * Вариант кнопки
     * @default contained
     */
    variant?: LoadingButtonProps['variant'];
    /**
     * Тип кнопки: submit, reset и т.д.
     * @default button
     */
    type?: LoadingButtonProps['type'];
    /**
     * Признак активности/неактивности
     * @default false
     */
    disabled?: LoadingButtonProps['disabled'];
    /**
     * Размер компонента
     * @default medium
     */
    size?: 'small' | 'medium';
    /**
     * Признак необходимости показа лоадера на кнопке
     * @default false
     */
    loading?: LoadingButtonProps['loading'];
    /**
     * Опциональные стили, переопределяющие дефолтные
     */
    sx?: LoadingButtonProps['sx'];
    /**
     * Кнопка-ссылка
     * Если имеется значение, то внутри компонента будет рендериться тэг a
     */
    href?: LoadingButtonProps['href'];
    /**
     * Цвет кнопки
     * @default 'primary'
     */
    color?: LoadingButtonProps['color'];
    /**
     * Css-класс
     */
    className?: LoadingButtonProps['className'];
    /**
     * Обработчики событий
     */
    onClick?: LoadingButtonProps['onClick'];
    onMouseEnter?: LoadingButtonProps['onMouseEnter'];
    onMouseLeave?: LoadingButtonProps['onMouseLeave'];
}>;

/**
 * Простой компонент кнопки
 */
export const Button: React.FunctionComponent<ButtonProps> = ({
    variant = 'contained',
    type,
    disabled,
    size,
    loading,
    sx,
    href,
    className,
    text,
    children,
    onClick,
    ...restProps
}) => {
    const Button = (
        <LoadingButton
            variant={variant}
            type={type}
            disabled={disabled}
            size={size}
            loading={loading}
            sx={sx}
            className={classnames('button', (disabled || loading) && 'button-disabled', className)}
            onClick={onClick}
            {...restProps}
        >
            {text || children}
        </LoadingButton>
    );

    if (href) {
        return (
            <Link to={href} className="button-link">
                {Button}
            </Link>
        );
    }

    return Button;
};
