import React from 'react';
import { Select } from 'antd';
import { AUTHORITY } from '../../constants/AuthorityType';

interface SelectClassIntferface {
	handleChange: (value: string) => void;
	defaultValue?: string;
	options: { value: string | number | keyof typeof AUTHORITY; label: string }[];
	placeholder?: string;
	isFull?: boolean;
	isReadOnly?: boolean;
}
const SelectClass: React.FC<SelectClassIntferface> = ({
	handleChange,
	defaultValue,
	options,
	placeholder,
	isFull,
	isReadOnly = false,
}) => {
	return (
		<Select
			className={'mt-auto mb-auto '.concat(isFull ? 'w-full' : 'w-[200px]')}
			onChange={handleChange}
			options={options}
			placeholder={placeholder || options[0].label || ''}
			disabled={!!isReadOnly}
		/>
	);
};

export default React.memo(SelectClass);
