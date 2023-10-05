import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Avatar, Dropdown } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Swal from 'sweetalert2';
import Table, { DataType } from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import SelectClass from '../../components/common/SelectClass';
import Button from '../../components/common/Button';
import { Toast } from '../../components/common/Toast';

function Manager() {
	const [filteredInfo, setFilterInfo] = React.useState<string>();

	const handleDelete = (id: number) => {
		console.log('hi');
		Swal.fire({
			title: '관리자 정보를 삭제하시겠습니까?',
			text: '삭제하시면 되돌릴 수 없습니다',
			iconHtml: '<a><img src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
			showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
			confirmButtonColor: '#DC2626', // confrim 버튼 색깔 지정
			cancelButtonColor: '#808080', // cancel 버튼 색깔 지정
			confirmButtonText: '삭제하기', // confirm 버튼 텍스트 지정
			cancelButtonText: '취소', // cancel 버튼 텍스트 지정
			reverseButtons: true, // 버튼 순서 거꾸로
			background: '#FFFFFF',
			color: '#212B36',
		}).then((result) => {
			// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) {
				// 모달창에서 confirm 버튼을 눌렀다면

				Toast.fire({
					iconHtml: '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
					title: '관리자 정보가 삭제되었습니다.',
					background: '#FFFFFF',
					color: '#212B36',
				});
			} else {
				// 모달창에서 cancel 버튼을 눌렀다면
			}
		});
	};

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
			width: '30px',
			align: 'right',
			render: (text) => (
				<Dropdown
					className="cursor-pointer"
					menu={{
						items: [
							{
								key: 'd1',
								label: (
									<a href="/dashboard">
										<SettingsOutlinedIcon className="mr-2" />
										수정
									</a>
								),
							},
							{
								key: 'd2',
								label: (
									<button type="button" onClick={() => handleDelete(1)}>
										<DeleteOutlineOutlinedIcon className="mr-2" />
										삭제
									</button>
								),
							},
						],
					}}
				>
					<MoreVertOutlinedIcon />
				</Dropdown>
			),
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
