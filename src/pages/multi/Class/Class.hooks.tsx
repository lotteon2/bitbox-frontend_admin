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
import { useCreateClassMutation } from '../../../mutations/useCreateClassMutation';
import { useGetAllClassQuery } from '../../../queries/useGetAllClassQuery';
import { usePatchClassMutation } from '../../../mutations/usePatchClassMutation';

export const useClassModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [classCode, setClassCode] = useState<number | null>();
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const { mutateAsync } = useCreateClassMutation();
	const { refetch } = useGetAllClassQuery();

	const clearValues = () => {
		setIsDisabled(true);
		setClassCode(null);
		setName('');
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsLoading(true);
		await mutateAsync({ className: name, classCode: classCode as number })
			.then((res) => {
				console.log(res);
				Toast(true, '반이 추가되었어요');
				clearValues();
				setIsModalOpen(false);
				refetch();
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
		if (classCode && name) {
			setIsDisabled(false);
		}
	}, [classCode, name]);

	return {
		isDisabled,
		classCode,
		setClassCode,
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

export const useClassUpdateModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const { data } = useGetAllClassQuery();

	const clearValues = () => {
		setIsDisabled(true);
	};

	const showModal = () => {
		setIsModalOpen(true);
		// console.log(data?.[id]);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	return {
		isDisabled,
		setIsDisabled,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		setIsLoading,
		showModal,
		handleCancel,
		clearValues,
	};
};

export const useClassTable = () => {
	const [classesData, setClassesData] = useState<DataType[]>([]);
	const {
		isModalOpen: isUpdateModalOpen,
		isDisabled: isUpdateClassDisabled,
		setIsDisabled: setIsUpdateClassDisabled,
		clearValues,
		isLoading: isUpdateClassLoading,
		setIsModalOpen: setIsUpdateClassModalOpen,
		setIsLoading: setIsLoadingUpdateClass,
		showModal,
		handleCancel: handleClassUpdateCancel,
	} = useClassUpdateModal();
	const { mutateAsync } = usePatchClassMutation();
	const { data, refetch } = useGetAllClassQuery();
	const [selectedIdx, setSelectedIdx] = useState<number>();
	const [selectedClassId, setSelectedClassId] = useState<number>();
	const [selectedClassCode, setSelectedClassCode] = useState<string>();
	const [selectedClassName, setSelectedClassName] = useState<string>();
	const [selectedIsGraduate, setSelectedIsGraduate] = useState<boolean>();

	const graduateOptions = [
		{ value: '교육', label: '교육' },
		{ value: '수료', label: '수료' },
	];

	const handleUpdateOk = async () => {
		setIsUpdateClassModalOpen(true);
		console.log(selectedClassId);
		setIsLoadingUpdateClass(true);
		await mutateAsync({
			classId: selectedClassId as number,
			params: {
				className: selectedClassName,
				isGraduate: selectedIsGraduate,
			},
		})
			.then((res) => {
				Toast(true, '클래스 정보가 수정되었어요');
				clearValues();
				setIsUpdateClassModalOpen(false);
				refetch();
			})
			.catch((err: AxiosError) => {
				Toast(false, '클래스 정보 수정에 실패했어요.');
			})
			.finally(() => {
				setIsLoadingUpdateClass(false);
			});
	};

	useEffect(() => {
		if (classesData.length > 0) {
			if (
				classesData[selectedIdx as number].name === selectedClassName &&
				classesData[selectedIdx as number].isFinished === selectedIsGraduate
			) {
				setIsUpdateClassDisabled(true);
			} else {
				setIsUpdateClassDisabled(false);
			}
		}
	}, [selectedIdx, selectedClassName, selectedIsGraduate]);

	useEffect(() => {
		const temp: DataType[] = [];
		if (!data?.length) {
			setClassesData([]);
			return;
		}
		data.forEach((it) => {
			temp.push({
				key: it.classId,
				classCode: it.classCode,
				name: it.adminInfos[0].adminName || '',
				class: it.className,
				isFinished: it.graduated,
			});
		});
		setClassesData([...temp]);
	}, [data]);

	const handleChangeIsGraduated = (value: string) => {
		setSelectedIsGraduate(() => value === '수료');
	};

	const deleteClass = async (idx: number) => {
		await mutateAsync({ classId: idx, params: { isDeleted: true } })
			.then(() => {
				Toast(true, '클래스 정보가 삭제됐어요.');
				refetch();
			})
			.catch((err: AxiosError) => Toast(false, '클래스 정보 삭제에 실패했어요.'));
	};

	const handleDelete = (id: number) => {
		Alert('클래스 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then(async (result) => {
			// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) {
				deleteClass(classesData[id].key);
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
			render: (text, temp, idx) => (
				<Dropdown
					className="cursor-pointer"
					menu={{
						items: [
							{
								key: 'updateClassInfo',
								label: (
									<button
										type="button"
										onClick={() => {
											setSelectedClassId(data ? data[idx].classId : 0);
											setSelectedClassName(data ? data[idx].className : '');
											setSelectedClassCode(data ? data[idx].classCode.toString() : '');
											setSelectedIdx(idx);
											showModal();
										}}
									>
										<SettingsOutlinedIcon className="mr-2" />
										수정
									</button>
								),
							},
							{
								key: 'deleteClassInfo',
								label: (
									<button type="button" onClick={() => handleDelete(idx)}>
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
		isUpdateClassDisabled,
		selectedIsGraduate,
		setSelectedIsGraduate,
		isUpdateModalOpen,
		isUpdateClassLoading,
		setIsLoadingUpdateClass,
		showModal,
		handleUpdateOk,
		handleClassUpdateCancel,
		handleDelete,
		columns,
		classesData,
		selectedClassCode,
		setSelectedClassCode,
		selectedClassName,
		setSelectedClassName,
		graduateOptions,
		handleChangeIsGraduated,
	};
};
