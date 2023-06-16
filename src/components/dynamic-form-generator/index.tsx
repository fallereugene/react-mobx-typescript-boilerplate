import React from 'react';
import { Loader } from '@components/loader';
import { Descriptor } from './contracts';
import { FormContent } from './components/form-content';

export type BaseFormProps = {
    /**
     * Schema descriptors
     */
    schema: Descriptor[];
    /**
     * Submit handler. Fires if form is valid and provide a model data
     */
    onSubmit(data: any): void;
    /**
     * Optinal data model
     */
    model?: { [key: string]: any } | null;
    /**
     * Optional css class name
     */
    className?: string;
    /**
     * Enable/disable form
     */
    disabled?: boolean;
    /**
     * Getting model from API
     */
    getModel?(): Promise<any>;
};

/**
 * Component which rendered form controls (and other UI components) based on passed descriptors.
 * Also allow to manage other UI elements in template such as title, spacer etc.
 */
const DynamicFormGenerator: React.FunctionComponent<BaseFormProps> = (props) => {
    const { schema, model, className, disabled, onSubmit, getModel } = props;
    const [formModel, setFormModel] = React.useState<{ [key: string]: any } | null>(null);

    const defineModel = React.useCallback(async () => {
        const dataModel = model || (getModel && (await getModel())) || {};
        setFormModel(dataModel);
    }, [getModel, model]);

    React.useEffect(() => {
        defineModel();
        return () => {
            setFormModel(null);
        };
    }, [defineModel]);

    if (!schema || !formModel) {
        return <Loader />;
    }

    return (
        <FormContent className={className} schema={schema} model={formModel} onSubmit={onSubmit} disabled={disabled} />
    );
};

export { DynamicFormGenerator };
