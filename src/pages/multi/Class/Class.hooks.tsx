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

export const useClassModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [classCode, setClassCode] = useState<number>(-1);
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		setClassCode(-1);
		setName('');
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsLoading(true);
		await classApi
			.createClass({ className: name, classCode })
			.then((res) => {
				console.log(res);
				Toast(true, '반이 추가되었어요');
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
	const [classCode, setClassCode] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		setClassCode('');
		setName('');
	};

	const showModal = (id: number) => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsLoading(true);
		Toast(true, '클래스 정보가 수정되었어요');
		clearValues();
		setIsLoading(false);
		setIsModalOpen(false);
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

export const useClassTable = () => {
	const [classesData, setClassesData] = useState<DataType[]>([]);
	const [isGraduate, setIsGradudate] = useState<string>('isNotGraduate');
	const {
		isModalOpen,
		isDisabled,
		isLoading,
		// classCode: ,
		// name,
		// setName,
		// setClassCode,
		showModal,
		handleOk,
		handleCancel,
	} = useClassUpdateModal();

	const getAllClass = async () => {
		await classApi
			.getClasses({ classId: 0 })
			.then((res) => {
				console.log(res);
				const temp: DataType[] = [];
				res.forEach((it) => {
					temp.push({
						key: it.classId,
						classCode: it.classCode,
						name: it.className,
						class: it.className,
						isFinished: it.graduated,
					});
				});
				setClassesData([...temp]);
			})
			.catch((err: AxiosError) => {
				Toast(false, err.message);
			});
	};

	const handleDelete = (id: number) => {
		Alert('클래스 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then(async (result) => {
			// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) {
				await classApi
					.updateClasses(classesData[id].key, { isDeleted: true })
					.then((res) => {
						console.log(res);
						Toast(true, '클래스 정보가 삭제되었습니다.');
					})
					.catch((err: AxiosError) => {
						Toast(false, err.message);
					});
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
								key: 'd1',
								label: (
									<button type="button" onClick={() => showModal(idx)}>
										<SettingsOutlinedIcon className="mr-2" />
										수정
									</button>
								),
							},
							{
								key: 'd2',
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

	const getData = async () => {
		await classApi.getClasses({ classId: 1 }).then((res) => {
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
		columns,
		classesData,
	};
};
