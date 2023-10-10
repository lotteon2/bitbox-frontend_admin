import { Select } from 'antd';

interface SelectClassIntferface {
	handleChange: (value: string) => void;
	defaultValue?: string;
	options: { value: string; label: string }[];
}
const SelectClass: React.FC<SelectClassIntferface> = ({ handleChange, defaultValue, options }) => {
	return (
		<Select
			className="mb-10 mt-auto mb-auto "
			defaultValue={defaultValue || options[0].value}
			style={{ width: 200 }}
			onChange={handleChange}
			options={options}
		/>
	);
};

export default SelectClass;
