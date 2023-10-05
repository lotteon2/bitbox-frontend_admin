import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Badge from '../../../components/common/Badge';
import { DataType } from '../../../components/common/Table';
import { Alert } from '../../../components/common/Alert';
import { Toast } from '../../../components/common/Toast';

export const useManagerModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return {
		isModalOpen,
		setIsModalOpen,
		loading,
		setLoading,
		showModal,
		handleOk,
		handleCancel,
	};
};

export const useManagerTable = () => {
	const handleDelete = (id: number) => {
		console.log('hi');

		Alert('관리자 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then((result) => {
			// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) {
				// 모달창에서 confirm 버튼을 눌렀다면
				Toast(true, '관리자 정보가 삭제되었습니다');
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

	return {
		handleDelete,
		columns,
		data,
	};
};
