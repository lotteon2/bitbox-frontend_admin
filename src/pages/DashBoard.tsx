import React from 'react';
import { Select } from 'antd';
import SelectClass from '../components/common/SelectClass';

export default function DashBoard() {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	// TODO: 초기 진입시 본인의 반 불러와서 options에 넣어주기
	const options = [
		{ value: 'jx411', label: '롯데이커머스2기' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
	];
	return (
		<div className="mx-3">
			<SelectClass handleChange={handleChange} options={options} />
			대시보드
		</div>
	);
}
