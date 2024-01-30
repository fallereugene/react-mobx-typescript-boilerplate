import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import { Button } from '@components/button';
import { Descriptor } from '../../contracts';
import { normalizeSchemaWithValidators } from '../../helpers';
import { Control } from '../control';

export type BaseFormProps = {
    /**
     * Schema descriptors
     */
    schema: Descriptor[];
    /**
     * Optinal data model
     */
    model: { [key: string]: any };
    /**
     * Submit handler. Fires if form is valid and provide a model data
     */
    onSubmit(data: any): void;
    /**
     * Optional css class name
     */
    className?: string;
    /**
     * Enable/disable form
     */
    disabled?: boolean;
    /**
     * Active locale name
     */
    currentLocale?: string;
};

const FormContent: React.FunctionComponent<BaseFormProps> = (props) => {
    const { schema, model, className, currentLocale, disabled = false, onSubmit } = props;
    const { t } = useTranslation();

    const formik = useFormik({
        ...normalizeSchemaWithValidators(schema, model),
        onSubmit(data) {
            onSubmit(data);
            formik.resetForm();
        },
    });

    React.useEffect(() => {
        const { errors, touched, setFieldTouched } = formik;
        Object.keys(errors).forEach((fieldName) => {
            if (Object.keys(touched).includes(fieldName)) {
                setFieldTouched(fieldName);
            }
        });
        // eslint-disable-next-line
    }, [currentLocale]);

    return (
        <form className={className} noValidate onSubmit={formik.handleSubmit}>
            {schema.map((schema) => {
                if (!('name' in schema)) {
                    // разметка, не относящаяся к контролам: сепараторы, заголовки,
                    // но при этом которые могут быть описаны с помощью дескрипторов
                    return null;
                }
                return <Control key={`${schema.name}`} formik={formik} schema={schema} disabled={disabled} />;
            })}
            <Grid container>
                <Button type="submit" variant="contained" disabled={disabled}>
                    {t('common.confirm')}
                </Button>
            </Grid>
        </form>
    );
};

export { FormContent };
