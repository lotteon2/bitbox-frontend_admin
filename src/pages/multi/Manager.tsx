import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Avatar } from 'antd';
import Table, { DataType } from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import TableStateChip from '../../components/common/TableStateChip';
import SelectClass from '../../components/common/SelectClass';
import Button from '../../components/common/Button';

function Manager() {
	const [filteredInfo, setFilterInfo] = React.useState<string>();

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text} size="large" />,
			width: '100px',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '등급',
			dataIndex: 'rate',
			key: 'rate',
			align: 'center',
			width: '100px',
			filters: [
				{ text: '강사', value: '강사' },
				{ text: '매니저', value: '매니저' },
			],
			render: (text) => (
				<div className="w-full">
					<Badge status={text} />
				</div>
			),
		},
		{
			title: '담당 클래스',
			dataIndex: 'class',
			key: 'class',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			render: (text) => <TableStateChip title={text} />,
		},
	];

	const data: DataType[] = [
		{
			key: '1',
			name: '지니리',
			rate: '강사',
			class: '롯데e커머스 2기',
			email: 'abc@naver.com',
			state: '변경',
			imageSrc: '',
		},
		{
			key: '2',
			name: '안광현',
			rate: '매니저',
			class: '롯데e커머스 1기',
			email: 'hi123@naver.com',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '3',
			name: '마덤보',
			rate: '매니저',
			class: '롯데e커머스 2기',
			email: 'hello@daum.com',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '4',
			name: '강사3',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			rate: '강사',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '5',
			name: '강사3',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			rate: '강사',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '6',
			name: '강사3',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			rate: '강사',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '7',
			name: '강사3',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			rate: '강사',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '8',
			name: '강사3',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			rate: '강사',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
	];

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
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
				<Button content="관리자 추가" />
			</div>
			<Table data={data} columns={columns} />
		</div>
	);
}
export default Manager;
