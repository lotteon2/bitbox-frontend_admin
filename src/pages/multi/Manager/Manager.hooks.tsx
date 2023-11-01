import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Avatar, Dropdown } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { AxiosError } from 'axios';
import Badge from '../../../components/common/Badge';
import { DataType } from '../../../components/common/Table';
import { Alert } from '../../../components/common/Alert';
import { Toast } from '../../../components/common/Toast';
import { useUpdateProfileModal } from '../../../hooks/useUpdateProfile';
import { AUTHORITY, getAuthority } from '../../../constants/AuthorityType';
import { useCreateAdminMutation } from '../../../mutations/useCreateAdminMutation';
import { useGetAllAdminQuery } from '../../../queries/useGetAllAdminQuery';
import { usePatchAdminMutation } from '../../../mutations/usePatchAdminMutation';
import { useUserStore } from '../../../stores/user/user.store';
import { useClassStore } from '../../../stores/class/class.store';

export const useManagerModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [authority, setAuthority] = useState<string>(getAuthority(AUTHORITY.ADMIN));
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);

	const { mutateAsync } = useCreateAdminMutation();
	const { refetch } = useGetAllAdminQuery();

	const handleChangeAuthority = (value: string) => {
		setAuthority(() => value);
	};

	const handleChangeSelectedClassIdForAdd = useCallback((value: string) => {
		dispatchClassId(Number(value));
		console.log(`selected ${value}`);
	}, []);

	const clearValues = () => {
		setIsDisabled(true);
		setEmail('');
		setName('');
		setAuthority(getAuthority(AUTHORITY.ADMIN));
	};

	const showModal = () => {
		setIsModalOpen(() => true);
	};

	const handleOk = async () => {
		setIsLoading(true);
		await mutateAsync({ adminEmail: email, adminName: name, adminAuthority: authority })
			.then((res) => {
				Toast(true, '관리자가 초대되었어요.');
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
		if (email && name) {
			setIsDisabled(false);
		}
	}, [isModalOpen, email, name, authority]);

	return {
		email,
		setEmail,
		name,
		setName,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		isDisabled,
		setIsLoading,
		showModal,
		handleOk,
		handleCancel,
		handleChangeAuthority,
		handleChangeSelectedClassIdForAdd,
	};
};

export const useManagerTable = () => {
	const navigate = useNavigate();
	const [admins, setAdmins] = useState<DataType[]>([]);
	const [selectedAdminId, setSelectedAdminId] = useState<string>();
	const [selectedIdx, setSelectedIdx] = useState<number>();
	const [selectedName, setSelectedName] = useState<string>('');
	const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
	const [isLogin, myClassesOption, myClasses, memberAuthority] = useUserStore((state) => [
		state.isLogin,
		state.myClassesOption,
		state.myClasses,
		state.authority,
	]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);

	const { data, fetchQuery, refetch } = useGetAllAdminQuery();
	const { mutateAsync } = usePatchAdminMutation();

	const {
		isModalOpen: isUpdateProfileModalOpen,
		setIsModalOpen: setIsUpdateProfileModalOpen,
		isLoading: isLoadingProfileModal,
		setIsLoading: setIsLoadingProfileModal,
		isDisabled: isDisabledProfileModal,
		setIsDisabled: setIsDisabledProfileModal,
		showModal: showUpdateModal,
		handleCancel: handleUpdateCancel,
		clearValues,
	} = useUpdateProfileModal();

	const handleChangeSelectedClassId = useCallback((value: string) => {
		dispatchClassId(Number(value));
		console.log(`selected ${value}`);
	}, []);

	const handleUpdateOk = async () => {
		setIsLoadingProfileModal(true);
		await mutateAsync({
			adminId: selectedAdminId as string,
			params: {
				adminProfileImg: selectedImageSrc,
				adminName: selectedName,
			},
		})
			.then((res) => {
				Toast(true, '정보가 수정되었어요');
				clearValues();
				setIsUpdateProfileModalOpen(false);
				refetch();
			})
			.catch((err: AxiosError) => {
				Toast(false, '정보 수정에 실패했어요.');
			})
			.finally(() => {
				setIsLoadingProfileModal(false);
			});
	};

	useEffect(() => {
		console.log('imageUrl', selectedImageSrc);
		if (admins.length > 0) {
			if (
				selectedName === admins[selectedIdx as number]?.name &&
				selectedImageSrc === admins[selectedIdx as number]?.imageSrc
			) {
				setIsDisabledProfileModal(true);
			} else {
				setIsDisabledProfileModal(false);
			}
		}
	}, [admins, data, selectedAdminId, selectedIdx, selectedName, selectedImageSrc, setIsDisabledProfileModal]);

	useEffect(() => {
		fetchQuery();
	}, [classId]);

	useEffect(() => {
		if (!data) {
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
		if (!data?.length) {
			setAdmins([]);
			return;
		}
		const temp: DataType[] = [];
		data.forEach((it, idx) => {
			temp.push({
				key: idx,
				state: it.adminId,
				name: it.adminName,
				email: it.adminEmail,
				rate: it.adminAuthority,
				imageSrc: it.adminProfileImg,
				class: it.classInfoResponses.length > 0 ? it.classInfoResponses[0].className : '',
			});
			setAdmins([...temp]);
		});
	}, [data]);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		if (memberAuthority) {
			if (memberAuthority === AUTHORITY.TEACHER) {
				Toast(false, '강사님은 접근 권한이 없는 페이지에요.');
				navigate('/404');
			}
		}
		return () => {
			dispatchClassId(-1);
		};
	}, []);

	const deleteAdmin = async (id: string) => {
		await mutateAsync({ adminId: id, params: { isDeleted: true } })
			.then(() => {
				Toast(true, '관리자 정보가 삭제됐어요.');
				refetch();
			})
			.catch((err: AxiosError) => Toast(false, '관리자 정보 삭제에 실패했어요.'));
	};

	const handleDelete = async (id: number) => {
		Alert({ title: '관리자 정보를 삭제하시겠어요?', text: '삭제하시면 되돌릴 수 없어요.' }).then((result) => {
			if (result.isConfirmed) {
				deleteAdmin(admins[id].state as string);
			}
		});
	};

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text || null} size="large" />,
			width: '100px',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '권한',
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
			render: (text) => <span>{text}</span>,
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
								key: 'updateManagerInfo',
								label: (
									<button
										type="button"
										onClick={() => {
											setSelectedIdx(idx);
											setSelectedName(data ? data[idx].adminName : '');
											setSelectedImageSrc(data ? data[idx].adminProfileImg : '');
											setSelectedAdminId(data ? data[idx].adminId : '');
											showUpdateModal();
										}}
									>
										<SettingsOutlinedIcon className="mr-2" />
										수정
									</button>
								),
							},
							{
								key: 'deleteManagerInfo',
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
		columns,
		admins,
		data,
		isUpdateProfileModalOpen,
		isLoadingProfileModal,
		isDisabledProfileModal,
		handleUpdateOk,
		handleUpdateCancel,
		selectedName,
		setSelectedName,
		myClassesOption,
		handleChangeSelectedClassId,
		selectedImageSrc,
		setSelectedImageSrc,
	};
};
