import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Dropdown } from 'antd';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useClassStore } from '../../../stores/class/class.store';
import { useUserStore } from '../../../stores/user/user.store';
import { DataType } from '../../../components/common/Table';
import TableStateChip from '../../../components/common/TableStateChip';
import { useGetAllRequestQuery } from '../../../queries/useGetAllRequestQuery';
import { usePatchRequestIsReadMutation } from '../../../mutations/usePatchRequestIsReadMutation';
import { Toast } from '../../../components/common/Toast';
import { REASON_STATEMENT } from '../../../constants/ReasonStatementType';
import { usePatchRequestStateMutation } from '../../../mutations/usePatchRequestStateMutation';
import { Alert } from '../../../components/common/Alert';

export const useRequestModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setIsDisabled] = useState<boolean>(false);
	const [selectedColumnIdx, setSelectedColumnIdx] = useState<number>(0);
	const [comment, setComment] = useState<string>('');
	const { data, refetch } = useGetAllRequestQuery();
	const { mutateAsync } = usePatchRequestIsReadMutation();
	const { mutateAsync: mutateRequestStateAsync } = usePatchRequestStateMutation();

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
		console.log(rowIndex);
		console.log(record);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const updateRequestState = async (idx: number, state: keyof typeof REASON_STATEMENT) => {
		await mutateRequestStateAsync({
			reasonStatementId: idx,
			params: {
				reasonState: state,
				rejectReason: '',
			},
		})
			.then((res) => {
				console.log(res);
				Toast(true, `사유서가 ${state === REASON_STATEMENT.APPROVE ? '승인' : '반려'}되었어요.`);
				setIsModalOpen(false);
				setComment('');
				refetch();
			})
			.catch((err) => {
				Toast(false, `사유서 ${state === REASON_STATEMENT.APPROVE ? '승인' : '반려'}에 실패했어요.`);
			});
	};

	const handleChangeRequestState = async (idx: number, state: keyof typeof REASON_STATEMENT) => {
		console.log(state);
		if (state === REASON_STATEMENT.APPROVE) {
			updateRequestState(idx, state);
		} else {
			Alert({ title: '정말로 반려하시겠어요?', text: '반려시 수정할 수 없습니다', submitBtnText: '반려하기' }).then(
				(res) => {
					updateRequestState(idx, state);
				},
			);
		}
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
		handleChangeRequestState,
		comment,
		setComment,
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
		loading,
		setLoading,
		showModal,
		handleOk,
		handleCancel,
		selectedColumnIdx,
		handleChangeRequestState,
		comment,
		setComment,
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
				reasonState: it.reasonState,
				imageSrc: it.reasonAttachedFile,
			});
			setRequestData([...temp]);
		});
	}, [data]);

	const columns: ColumnsType<DataType> = [
		{
			dataIndex: 'key',
			key: 'key',
			render: (text) => <span className="hidden">{text}</span>,
		},
		{
			title: '제목',
			dataIndex: 'title',
			key: 'title',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '내용',
			dataIndex: 'content',
			key: 'content',
			render: (text: string) => <span>{text.length > 12 ? text.slice(0, 10).concat('...') : text}</span>,
			align: 'center',
		},
		{
			title: '사유일자',
			dataIndex: 'date',
			key: 'date',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '작성자',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '',
			dataIndex: 'reasonState',
			key: 'reasonState',
			align: 'center',
			width: '100px',
			render: (text) => (
				<div className="w-full">
					<TableStateChip title={text} />
				</div>
			),
		},
		{
			key: 'isRead',
			dataIndex: 'isRead',
		},
		{
			key: 'imageSrc',
			dataIndex: 'imageSrc',
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
		handleChangeRequestState,
		comment,
		setComment,
	};
};
