import { useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Dropdown } from 'antd';
import { AxiosError } from 'axios';
import { DataType } from '../../../components/common/Table';
import { Toast } from '../../../components/common/Toast';
import { Alert } from '../../../components/common/Alert';
import { classApi } from '../../../apis/class/classAPIService';
import { examApi } from '../../../apis/exam/examAPIService';

export const useExamModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [perfectScore, setPerfectScore] = useState<number | null>(null);
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		setPerfectScore(null);
		setName('');
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	// TODO: 반선택하는 로직 추가
	const handleOk = async () => {
		setIsLoading(true);
		await examApi
			.createExam({ classId: 1, examName: name, perfectScore: perfectScore as number })
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

	const showModal = (examId: number, className: string, examName: string, perfectScore: number) => {
		setUpdatePerfectScore(perfectScore);
		setUpdateName(examName);
		setSelectedClassName(className);
		setIsModalOpen(true);
		setSelectedExamId(examId);
	};

	const handleOk = async () => {
		setIsLoading(true);
		// console.log(examName, perfectScore, className);
		await examApi
			.updateExam(selectedExamId, {
				examName: updateName,
				perfectScore: updatePerfectScore,
			})
			.then((res) => {
				console.log(res);
				Toast(true, '시험 정보가 수정되었어요');
			});
		// clearValues();
		setIsLoading(false);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		// clearValues();
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
	const [examsData, setExamsData] = useState<DataType[]>([]);
	const [isGraduate, setIsGradudate] = useState<string>('isNotGraduate');

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

	// const { updateName, setUpdateName, updatePerfectScore, setUpdatePerfectScore } = useExamUpdateModal();

	const getAllClass = async () => {
		await examApi
			.getExamsByClassId(1)
			.then((res) => {
				console.log(res);
				const temp: DataType[] = [];
				res.forEach((it) => {
					temp.push({
						key: it.examId,
						exam: it.examName,
						class: it.classes.className,
						score: it.perfectScore,
					});
				});
				setExamsData([...temp]);
			})
			.catch((err: AxiosError) => {
				Toast(false, err.message);
			});
	};

	const handleDelete = (id: number) => {
		Alert('시험 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then(async (result) => {
			if (result.isConfirmed) {
				await examApi
					.updateExam(id, { isDeleted: true })
					.then((res) => {
						Toast(true, '시험 정보가 삭제되었습니다.');
					})
					.catch((err: AxiosError) => {
						Toast(false, err.message);
					});
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
												examsData[idx].key,
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

	const getData = async () => {
		await examApi.getExamsByClassId(1).then((res) => {
			console.log(res);
		});
	};
	useEffect(() => {
		getData();
		getAllClass();
	}, []);

	return {
		isDisabled,
		isGraduate,
		setIsGradudate,
		// name,
		// setName,
		isModalOpen,
		// setIsModalOpen,
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
	};
};
