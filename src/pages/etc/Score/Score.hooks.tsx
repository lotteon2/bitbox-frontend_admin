import { useState, useEffect } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ModeEdtOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Toast } from '../../../components/common/Toast';
import { DataType } from '../../../components/common/Table';
import { useUserStore } from '../../../stores/user/user.store';
import { useClassStore } from '../../../stores/class/class.store';
import { useGetAllExamQuery } from '../../../queries/useGetAllExamQuery';
import { useGetAllScoreByExamIdQuery } from '../../../queries/useGetAllScoreQuery';
import { useExamStore } from '../../../stores/examSearch/examSearchStore';
import { usePatchGradeMutation } from '../../../mutations/usePatchGradeMutation';

export const useChangeScoreModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [score, setScore] = useState<number>();
	const [exam, setExam] = useState<string>();
	const [name, setName] = useState<string>();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [selectedGradeId, setSelectedGradeId] = useState<number>(0);
	const [selectedColumnIdx, setSelectedColumnIdx] = useState<number>(-1);

	const { data, refetch } = useGetAllScoreByExamIdQuery();
	const { mutateAsync } = usePatchGradeMutation();

	const clearValues = () => {
		setIsDisabled(true);
	};

	const showModal = async (record: DataType, rowIndex: number) => {
		setIsModalOpen(true);
		setSelectedColumnIdx(rowIndex);
		setSelectedGradeId(record.key);
		setName(record.name);
		setExam(record.content);
		setScore(record.score);
	};

	const handleOk = async () => {
		setIsLoading(true);
		await mutateAsync({ gradeId: selectedGradeId, params: { score: score || -1 } })
			.then((res) => {
				Toast(true, '성적이 변경되었어요.');
				clearValues();
				setIsModalOpen(false);
				refetch();
			})
			.catch((err) => {
				Toast(false, '성적 변경에 실패했어요.');
				setIsModalOpen(false);
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
		if (!data || selectedColumnIdx === -1) return;
		if (score !== undefined && score > data[selectedColumnIdx].perfectScore) {
			Toast(false, '만점보다 높은 점수는 입력할 수 없어요.');
			setIsDisabled(true);
		} else if (score === data[selectedColumnIdx].score) {
			Toast(false, '기존의 점수와 동일하게 입력할 수 없어요.');
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [score]);

	return {
		isDisabled,
		exam,
		name,
		score,
		setScore,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
	};
};

export const useScoreTable = () => {
	const navigate = useNavigate();
	const [scoreData, setScoreData] = useState<DataType[]>([]);
	const [isLogin, myClassesOption, myClasses] = useUserStore((state) => [
		state.isLogin,
		state.myClassesOption,
		state.myClasses,
	]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);
	const [selectedExamId, dispatchSelectedExamId] = useExamStore((state) => [
		state.selectedExamId,
		state.dispatchSelectedExamId,
	]);
	const [examsOption, setExamsOption] = useState<{ value: number; label: string }[]>([]);

	const {
		isDisabled: isUpdateDisabled,
		exam,
		name,
		score,
		setScore,
		isModalOpen: isUpdateModalOpen,
		isLoading: isUpdateLoading,
		showModal: showUpdateModal,
		handleOk: handleUpdateOk,
		handleCancel: handleUpdateCancel,
	} = useChangeScoreModal();

	const { data } = useGetAllScoreByExamIdQuery();

	const handleChangeSelectedClassId = (value: string) => {
		dispatchClassId(Number(value));
	};

	const handleChangeSelectedExamId = (value: string) => {
		dispatchSelectedExamId(Number(value));
	};

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		return () => {
			dispatchClassId(-1);
			dispatchSelectedExamId(-1);
		};
	}, []);

	useEffect(() => {
		if (!data?.length) {
			setScoreData([]);
			if (myClassesOption.length > 0) {
				const temp: { value: number; label: string }[] = [];
				if (classId === -1) {
					dispatchClassId(myClassesOption[0].value);
					if (myClasses[0].exams && myClasses[0].exams.length > 0) {
						myClasses[0].exams.forEach((it) => {
							temp.push({
								value: it.examId,
								label: it.examName,
							});
						});
					}
					setExamsOption([...temp]);
				} else {
					const idx = myClasses.findIndex((it) => it.classId === classId);
					if (myClasses[idx].exams && myClasses[idx].exams.length > 0) {
						myClasses[idx].exams.forEach((it) => {
							temp.push({
								value: it.examId,
								label: it.examName,
							});
						});
					}
					setExamsOption([...temp]);
				}
			}
			return;
		}
		if (myClassesOption.length > 0) {
			const temp: { value: number; label: string }[] = [];
			if (classId === -1) {
				dispatchClassId(myClassesOption[0].value);
				if (myClasses[0].exams.length > 0) {
					myClasses[0].exams.forEach((it) => {
						temp.push({
							value: it.examId,
							label: it.examName,
						});
					});
				}
				setExamsOption([...temp]);
			} else {
				const idx = myClasses.findIndex((it) => it.classId === classId);
				if (myClasses[idx].exams.length > 0) {
					myClasses[idx].exams.forEach((it) => {
						temp.push({
							value: it.examId,
							label: it.examName,
						});
					});
				}
				setExamsOption([...temp]);
			}
		}
	}, [classId, myClassesOption]);

	useEffect(() => {
		if (!data?.length) {
			setScoreData([]);
			return;
		}
		const temp: DataType[] = [];
		data.forEach((it) => {
			temp.push({
				key: it.gradeId,
				content: it.examName,
				name: it.memberName,
				score: it.score,
				avgScore: it.perfectScore,
			});
		});
		setScoreData([...temp]);
	}, [data]);

	const columns: ColumnsType<DataType> = [
		{
			dataIndex: 'key',
			key: 'key',
			width: '0px',
			render: (text: string) => <div className="hidden">{text}</div>,
		},
		{
			title: '교육생',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text: string) => <span>{text}</span>,
		},
		{
			title: '시험명',
			dataIndex: 'content',
			key: 'content',
			render: (text: string) => <span>{text.length > 12 ? text.slice(0, 10).concat('...') : text}</span>,
			align: 'center',
		},
		{
			title: '성적',
			dataIndex: 'score',
			key: 'score',
			align: 'center',
			render: (text: string) => <span>{text}</span>,
		},
		{
			title: '만점',
			dataIndex: 'avgScore',
			key: 'avgScore',
			align: 'center',
			render: (text: string) => <span>{text}</span>,
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			align: 'right',
			render: (text, a, idx) => (
				<button
					type="button"
					onClick={() =>
						showUpdateModal(
							{
								key: data ? data[idx].gradeId : -1,
								content: data ? data[idx].examName : '',
								score: data ? data[idx].score : -1,
								name: data ? data[idx].memberName : '',
							},
							idx,
						)
					}
				>
					<ModeEdtOutlineOutlinedIcon className="mr-2" />
				</button>
			),
		},
	];

	return {
		scoreData,
		myClassesOption,
		examsOption,
		handleChangeSelectedClassId,
		columns,
		showUpdateModal,
		handleUpdateOk,
		handleUpdateCancel,
		isUpdateDisabled,
		isUpdateLoading,
		isUpdateModalOpen,
		handleChangeSelectedExamId,
		exam,
		name,
		score,
		setScore,
	};
};
