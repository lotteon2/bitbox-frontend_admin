import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Dropdown, Modal } from 'antd';
import { DataType } from '../../../components/common/Table';
import { Toast } from '../../../components/common/Toast';
import { Alert } from '../../../components/common/Alert';

export const useClassModal = () => {
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

export const useClassTable = () => {
	const handleDelete = (id: number) => {
		console.log('hi');
		Alert('클래스 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then((result) => {
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
			title: '반 이름',
			dataIndex: 'class',
			key: 'class',
			align: 'center',
		},
		{
			title: '반 코드',
			dataIndex: 'classCode',
			key: 'classCode',
			align: 'center',
		},
		{
			title: '수료 여부',
			dataIndex: 'isFinished',
			key: 'isFinished',
			align: 'center',
			render: (value: boolean) => <span>{value ? 'Y' : 'N'}</span>,
		},
		{
			title: '대표 담당자',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <a href="/dashboard">{text}</a>,
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
			name: '매니저32',
			isFinished: false,
			class: '롯데e커머스 2기',
			classCode: 'JX411',
			email: 'abc@naver.com',
			state: '변경',
		},
		{
			key: '2',
			name: '안광현',
			class: '롯데e커머스 1기',
			isFinished: false,
			email: 'hi123@naver.com',
			state: '변경',
		},
		{
			key: '3',
			name: '마덤보',
			class: '롯데e커머스 2기',
			isFinished: true,
			email: 'hello@daum.com',
			state: '변경',
		},
		{
			key: '4',
			name: '강사3',
			email: 'hello@daum.com',
			isFinished: true,
			class: '코엑스 3기',
			state: '변경',
		},
		{
			key: '5',
			name: '강사3',
			isFinished: false,
			email: 'hello@daum.com',
			class: '코엑스 3기',
			state: '변경',
		},
		{
			key: '6',
			name: '학생10',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			isFinished: false,
			rate: '강사',
			state: '변경',
			classCode: 'JX415',
		},
		{
			key: '7',
			name: '학생5',
			email: 'hello@daum.com',
			classCode: 'JX411',
			class: '코엑스 3기',
			rate: '강사',
			isFinished: true,
			state: '변경',
		},
		{
			key: '8',
			name: '학생8',
			email: 'hello@daum.com',
			class: '코엑스 3기',
			rate: '강사',
			state: '변경',
			isFinished: true,
			imageSrc: '',
		},
	];

	return {
		handleDelete,
		data,
		columns,
	};
};
