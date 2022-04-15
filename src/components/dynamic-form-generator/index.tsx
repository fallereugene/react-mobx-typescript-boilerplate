import { BaseFormProps } from './contracts';
import { Loader } from '@/components/loader';
import { FormContent } from './components/form-content';

/**
 * Компонент, позволяющий рендерить формы на основе описанных дескрипторов
 * Позволяет также управлять шаблоном не только в разрезе контролов, но и прочих ui-элементов:
 * заголовки и т.д.
 * @param props входящие пропсы
 * @returns
 */
const DynamicFormGenerator: React.FunctionComponent<BaseFormProps> = (props) => {
    const { schema, className, disabled, onSubmit, getModel } = props;
    const [formModel, setFormModel] = React.useState<{ [key: string]: any } | null>(null);

    const defineModel = React.useCallback(async () => {
        const model = getModel ? await getModel() : {};
        setFormModel(model);
    }, [getModel]);

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
