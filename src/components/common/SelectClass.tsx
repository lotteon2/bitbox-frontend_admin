import { Select } from 'antd';
import { AUTHORITY } from '../../constants/AuthorityType';

interface SelectClassIntferface {
	handleChange: (value: string) => void;
	defaultValue?: string;
	options: { value: string | keyof typeof AUTHORITY; label: string }[];
	placeholder?: string;
}
const SelectClass: React.FC<SelectClassIntferface> = ({ handleChange, defaultValue, options, placeholder }) => {
	return (
		<Select
			className="mb-10 mt-auto mb-auto "
			defaultValue={defaultValue || options[0].value}
			style={{ width: 200 }}
			onChange={handleChange}
			options={options}
			placeholder={placeholder || options[0].value}
		/>
	);
};

export default SelectClass;
