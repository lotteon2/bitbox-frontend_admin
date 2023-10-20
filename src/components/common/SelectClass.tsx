import { Select } from 'antd';
import { AUTHORITY } from '../../constants/AuthorityType';

interface SelectClassIntferface {
	handleChange: (value: string) => void;
	defaultValue?: string;
	options: { value: string | keyof typeof AUTHORITY; label: string }[];
	placeholder?: string;
	isFull?: boolean;
}
const SelectClass: React.FC<SelectClassIntferface> = ({ handleChange, defaultValue, options, placeholder, isFull }) => {
	return (
		<Select
			className={'mt-auto mb-auto '.concat(isFull ? 'w-full' : 'w-[200px]')}
			defaultValue={defaultValue || options[0].value}
			onChange={handleChange}
			options={options}
			placeholder={placeholder || options[0].value}
		/>
	);
};

export default SelectClass;
