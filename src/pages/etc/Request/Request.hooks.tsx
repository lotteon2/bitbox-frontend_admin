import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { useClassStore } from '../../../stores/class/class.store';
import { useUserStore } from '../../../stores/user/user.store';
import { DataType } from '../../../components/common/Table';
import Badge from '../../../components/common/Badge';
import TableStateChip from '../../../components/common/TableStateChip';

export const useRequestModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setIsDisabled] = useState<boolean>(false);

	const showModal = () => {
		// TODO 읽음 처리
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleRejectRequest = () => {
		console.log('반려');
	};

	const handleApproveRequest = () => {
		console.log('승인');
	};

	return {
		isModalOpen,
		setIsModalOpen,
		loading,
		setLoading,
		showModal,
		handleOk,
		handleCancel,
		disabled,
		setIsDisabled,
	};
};

export const useRequestTable = () => {
	const navigate = useNavigate();
	const [isLogin, myClassesOption] = useUserStore((state) => [state.isLogin, state.myClassesOption]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);
	const {
		isModalOpen,
		setIsModalOpen,
		disabled,
		setIsDisabled,
		loading,
		setLoading,
		showModal,
		handleOk,
		handleCancel,
	} = useRequestModal();

	const handleChangeSelectedClassId = (value: string) => {
		console.log(`selected ${value}`);
		dispatchClassId(Number(value));
	};

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		return () => {
			dispatchClassId(-1);
		};
	}, []);

	const requestData = [
		{
			key: 1,
			title: '사유서제출해요',
			content: '입원',
			date: '2023.09.08',
			name: '최성훈',
		},
	];

	const columns: ColumnsType<DataType> = [
		{
			dataIndex: 'key',
			key: 'key',
		},
		{
			title: '제목',
			dataIndex: 'title',
			key: 'title',
			render: (text) => <a href="/dashboard">{text}</a>,
		},
		{
			title: '내용',
			dataIndex: 'content',
			key: 'content',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '사유일자',
			dataIndex: 'date',
			key: 'date',
			align: 'center',
		},
		{
			title: '작성자',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			align: 'center',
			width: '100px',
			render: (text) => (
				<div className="w-full">
					<TableStateChip title="반려" />
				</div>
			),
		},
	];

	return {
		requestData,
		columns,
		myClassesOption,
		handleChangeSelectedClassId,
		isModalOpen,
		loading,
		disabled,
		handleOk,
		handleCancel,
	};
};
