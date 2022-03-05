import FormGroup from '@mui/material/FormGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ICheckbox {
    disabled?: boolean;
    label?: FormControlLabelProps['label'];
    checked?: FormControlLabelProps['checked'];
}

const CheckboxControl: React.FunctionComponent<ICheckbox> = ({ label = '', checked, disabled }) => {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked={checked} disabled={disabled} />} label={label} />
        </FormGroup>
    );
};

export { CheckboxControl };
