import React from 'react';
import { useFormik } from 'formik';
import { FormDescriptor } from '../../contracts';
import { InputText } from './input-text';

interface IProps {
    formik: ReturnType<typeof useFormik>;
    schema: FormDescriptor;
    disabled: boolean;
}

const Control: React.FunctionComponent<IProps> = (props) => {
    const { schema, formik, disabled } = props;
    const {
        name,
        options: { label = '', prompt = '' },
    } = schema;

    const onBlur = formik.handleBlur;
    const value = formik.getFieldMeta(name).value ?? ``;

    const defaultProps = {
        errorText: (formik.touched[name] && (formik.errors[name] as string)) || ``,
        onChange: formik.handleChange,
        name,
        label,
        prompt,
        disabled,
    };

    const InputFieldComponent = (() => {
        switch (schema.type) {
            case 'input':
                return <InputText onBlur={onBlur} type={schema.options.type} value={value} {...defaultProps} />;
            default:
                return null;
        }
    })();

    return (
        InputFieldComponent && (
            <>
                <div style={{ marginTop: 10 }} />
                {InputFieldComponent}
                <div style={{ marginBottom: 10 }} />
            </>
        )
    );
};

export { Control };
