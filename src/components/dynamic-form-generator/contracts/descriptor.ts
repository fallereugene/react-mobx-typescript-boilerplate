import FormDescriptor from './form-descriptor';
import TemplateDescriptor from './template-descriptor';

// тип, объединяющий в себе как непосрдественно дескриптор контролов,
// так и дескриптор управления шаблоном
type Descriptor = FormDescriptor | TemplateDescriptor;

export default Descriptor;
