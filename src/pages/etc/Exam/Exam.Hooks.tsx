import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Dropdown } from 'antd';
import { AxiosError } from 'axios';
import { DataType } from '../../../components/common/Table';
import { Toast } from '../../../components/common/Toast';
import { Alert } from '../../../components/common/Alert';
import { useUserStore } from '../../../stores/user/user.store';
import { useGetAllExamQuery } from '../../../queries/useGetAllExamQuery';
import { useClassStore } from '../../../stores/class/class.store';
import { useCreateExamMutation } from '../../../mutations/useCreateExamMutation';
import { usePatchExamMutation } from '../../../mutations/usePatchExamMutation';

export const useExamModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [perfectScore, setPerfectScore] = useState<number | null>(null);
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const myClassesOption = useUserStore((state) => state.myClassesOption);
	const classId = useClassStore((state) => state.classId);

	const { mutateAsync } = useCreateExamMutation();

	const clearValues = () => {
		setIsDisabled(true);
		setPerfectScore(null);
		setName('');
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsLoading(true);
		await mutateAsync({
			classId: classId === -1 ? myClassesOption[0].value : classId,
			examName: name,
			perfectScore: perfectScore as number,
		})
			.then((res) => {
				console.log(res);
				Toast(true, '시험이 추가되었어요');
				clearValues();
				setIsModalOpen(false);
			})
			.catch((err: AxiosError) => {
				Toast(false, err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	useEffect(() => {
		if (perfectScore && name) {
			setIsDisabled(false);
		}
		if (!perfectScore || !name) {
			setIsDisabled(true);
		}
	}, [perfectScore, name]);

	return {
		isDisabled,
		perfectScore,
		setPerfectScore,
		name,
		setName,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
	};
};

export const useExamUpdateModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [updateName, setUpdateName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [updatePerfectScore, setUpdatePerfectScore] = useState<number>(0);
	const [selectedClassName, setSelectedClassName] = useState<string>('');
	const [selectedExamId, setSelectedExamId] = useState<number>(0);

	/* react-query */
	const { mutateAsync } = usePatchExamMutation();
	const { refetch } = useGetAllExamQuery();
	const showModal = (examId: number, className: string, examName: string, perfectScore: number) => {
		setUpdatePerfectScore(perfectScore);
		setUpdateName(examName);
		setSelectedClassName(className);
		setIsModalOpen(true);
		setSelectedExamId(examId);
		console.log('EXAM ID', examId);
	};

	const handleOk = async () => {
		setIsLoading(true);
		console.log(selectedExamId, updateName, updatePerfectScore);
		await mutateAsync({
			examId: selectedExamId as number,
			params: {
				examName: updateName,
				perfectScore: updatePerfectScore,
			},
		}).then((res) => {
			console.log(res);
			Toast(true, '시험 정보가 수정되었어요');
			refetch();
		});
		setIsLoading(false);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		console.log(updateName, updatePerfectScore);
		if (updatePerfectScore && updateName) {
			setIsDisabled(false);
		}
		if (!updatePerfectScore || !updateName) {
			setIsDisabled(true);
		}
	}, [updatePerfectScore, updateName]);

	return {
		isDisabled,
		updatePerfectScore,
		setUpdatePerfectScore,
		updateName,
		setUpdateName,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
		selectedClassName,
	};
};

export const useExamTable = () => {
	const navigate = useNavigate();
	const [examsData, setExamsData] = useState<DataType[]>([]);
	const [isLogin, myClassesOption, myClasses] = useUserStore((state) => [
		state.isLogin,
		state.myClassesOption,
		state.myClasses,
	]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);

	/* react-query */
	const { data, fetchQuery, refetch } = useGetAllExamQuery();
	const { mutateAsync } = usePatchExamMutation();
	const {
		isModalOpen,
		isDisabled,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
		updateName,
		setUpdateName,
		updatePerfectScore,
		setUpdatePerfectScore,
		selectedClassName,
	} = useExamUpdateModal();

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		return () => {
			dispatchClassId(-1);
		};
	}, []);

	useEffect(() => {
		if (!data?.length) {
			setExamsData([]);
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
		fetchQuery();
	}, [classId]);

	useEffect(() => {
		console.log('data', data);
		if (!data?.length) {
			setExamsData([]);
			return;
		}
		const temp: DataType[] = [];
		data.forEach((it) => {
			temp.push({
				key: it.examId,
				exam: it.examName,
				class: it.className,
				score: it.perfectScore,
				avgScore: it.avg,
			});
			setExamsData([...temp]);
		});
	}, [data]);

	const handleChangeSelectedClassId = useCallback((value: string) => {
		dispatchClassId(Number(value));
		console.log(`selected ${value}`);
	}, []);

	const deleteExam = async (idx: number) => {
		await mutateAsync({ examId: idx, params: { isDeleted: true } })
			.then(() => {
				Toast(true, '시험 정보가 삭제되었어요.');
				refetch();
			})
			.catch((err) => Toast(false, '시험 정보 삭제에 실패했어요.'));
	};

	const handleDelete = (id: number) => {
		Alert({ title: '시험 정보를 삭제하시겠어요?', text: '삭제하면 되돌릴 수 없어요' }).then(async (result) => {
			if (result.isConfirmed) {
				deleteExam(id);
			}
		});
	};

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'key',
			key: 'key',
		},
		{
			title: '시험 이름',
			dataIndex: 'exam',
			key: 'exam',
			align: 'center',
		},
		{
			title: '반 이름',
			dataIndex: 'class',
			key: 'class',
			align: 'center',
		},
		{
			title: '만점',
			dataIndex: 'score',
			key: 'score',
			align: 'center',
			render: (value: number) => <span>{value}</span>,
		},
		{
			title: '평균 점수',
			dataIndex: 'avgScore',
			key: 'avgScore',
			render: (text: number) => <span>{text}</span>,
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			width: '30px',
			align: 'right',
			render: (text, temp, idx) => (
				<Dropdown
					className="cursor-pointer"
					menu={{
						items: [
							{
								key: 'updateExam',
								label: (
									<button
										type="button"
										onClick={() =>
											showModal(
												examsData[idx].key as number,
												examsData[idx].class as string,
												examsData[idx].exam as string,
												examsData[idx].score as number,
											)
										}
									>
										<SettingsOutlinedIcon className="mr-2" />
										수정
									</button>
								),
							},
							{
								key: 'deleteExam',
								label: (
									<button type="button" onClick={() => handleDelete(examsData[idx].key)}>
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

	return {
		isDisabled,
		isModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
		handleDelete,
		selectedClassName,
		updateName,
		setUpdateName,
		columns,
		examsData,
		updatePerfectScore,
		setUpdatePerfectScore,
		handleChangeSelectedClassId,
		myClassesOption,
	};
};
