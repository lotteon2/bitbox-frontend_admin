import React, { useEffect } from 'react';
import { Select } from 'antd';
import { AUTHORITY } from '../../constants/AuthorityType';

interface SelectClassIntferface {
	handleChange: (value: string) => void;
	options: { value: string | number | keyof typeof AUTHORITY; label: string }[];
	placeholder?: string;
	isFull?: boolean;
	isReadOnly?: boolean;
}
const SelectClass: React.FC<SelectClassIntferface> = ({
	handleChange,
	options,
	placeholder,
	isFull,
	isReadOnly = false,
}) => {
	useEffect(() => {
		console.log('SelectClass');
	}, []);
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
