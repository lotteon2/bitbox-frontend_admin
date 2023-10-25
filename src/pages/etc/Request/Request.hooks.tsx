import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { useClassStore } from '../../../stores/class/class.store';
import { useUserStore } from '../../../stores/user/user.store';
import { DataType } from '../../../components/common/Table';
import TableStateChip from '../../../components/common/TableStateChip';
import { useGetAllRequestQuery } from '../../../queries/useGetAllRequestQuery';
import { usePatchRequestIsReadMutation } from '../../../mutations/usePatchRequestIsReadMutation';
import { Toast } from '../../../components/common/Toast';

export const useRequestModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setIsDisabled] = useState<boolean>(false);
	const [selectedColumnIdx, setSelectedColumnIdx] = useState<number>(0);
	const { data, refetch } = useGetAllRequestQuery();
	const { mutateAsync } = usePatchRequestIsReadMutation();

	const showModal = async (record: DataType, rowIndex: number) => {
		const selectedColumnKey = data?.reasonStatements.findIndex((it) => it.reasonStatementId === record.key);
		setSelectedColumnIdx(rowIndex);
		setIsModalOpen(true);

		if (!data?.reasonStatements[selectedColumnKey as number].read) {
			await mutateAsync(record.key)
				.then((res) => {
					console.log(res);
					Toast(true, '사유서 읽음 처리에 성공했어요.');
					refetch();
				})
				.catch((err) => {
					Toast(false, '사유서 읽음 처리에 실패했어요.');
				});
		}
		console.log(record);
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
		selectedColumnIdx,
	};
};

export const useRequestTable = () => {
	const navigate = useNavigate();
	const [requestData, setRequestData] = useState<DataType[]>([]);
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
		selectedColumnIdx,
	} = useRequestModal();

	/* react-query */
	const { data } = useGetAllRequestQuery();

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

	useEffect(() => {
		if (!data?.reasonStatements?.length) {
			setRequestData([]);
			return;
		}
		if (myClassesOption.length > 0) {
			if (classId === -1) {
				dispatchClassId(myClassesOption[0].value);
			}
			console.log('selectedClassId', classId);
		}
	}, [classId, myClassesOption]);

	useEffect(() => {
		console.log('data', data);
		if (!data?.reasonStatements?.length) {
			setRequestData([]);
			return;
		}
		const temp: DataType[] = [];
		data.reasonStatements.forEach((it) => {
			temp.push({
				key: it.reasonStatementId,
				title: it.reasonTitle,
				content: it.reasonContent,
				date: it.attendanceDate,
				name: it.memberName,
				isRead: it.read,
			});
			setRequestData([...temp]);
		});
	}, [data]);

	const requestData2 = [
		{
			key: 1,
			title: '사유서제출해요',
			content: '입원',
			date: '2023.09.08',
			name: '최성훈',
			isRead: true,
		},
		{
			key: 2,
			title: '사유서제출해요',
			content: '입원',
			date: '2023.09.08',
			name: '최성훈',
			isRead: false,
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
			render: (text: string) => <a href="/dashboard">{text.length > 12 ? text.slice(0, 10).concat('...') : text}</a>,
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
		{
			key: 'isRead',
			dataIndex: 'isRead',
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
		showModal,
		selectedColumnIdx,
	};
};
