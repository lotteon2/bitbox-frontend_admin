import { ColumnsType } from 'antd/es/table';
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
import { adminApi } from '../../../apis/admin/adminAPIService';
import { AUTHORITY, getAuthority } from '../../../constants/AuthorityType';
import { UpdateAdminInfoParams } from '../../../apis/admin/adminAPIService.types';
import { useCreateAdminMutation } from '../../../mutations/useCreateAdminMutation';
import { useGetAllAdminQuery } from '../../../queries/useGetAllAdminQuery';

export const useManagerModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [authority, setAuthority] = useState<string>(getAuthority(AUTHORITY.ADMIN));
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	// TODO : classId 추가
	const { mutateAsync } = useCreateAdminMutation(1);
	const { data, refetch } = useGetAllAdminQuery();

	const handleChangeAuthority = (value: string) => {
		setAuthority(() => value);
	};

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
		console.log(authority);
		await mutateAsync({ adminEmail: email, adminName: name, adminAuthority: authority })
			.then((res) => {
				Toast(true, '관리자가 초대되었어요');
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
	};
};

const updateAdmin = async (params: UpdateAdminInfoParams) => {
	const result = await adminApi.updateAdmin(params);
	return result;
};

export const useManagerTable = (showModal: () => void) => {
	const [admins, setAdmins] = useState<DataType[]>([]);
	const [authority, setAuthority] = useState<string>();

	const { data, refetch } = useGetAllAdminQuery();

	useEffect(() => {
		const temp: DataType[] = [];
		if (!data) {
			Toast(false, '관리자 리스트를 불러오지 못했어요.');
			return;
		}
		data.forEach((it) => {
			temp.push({
				key: it.adminId,
				name: it.adminName,
				email: it.adminEmail,
				rate: it.adminAuthority,
				imageSrc: it.adminProfileImg,
				class: it.classInfoResponses[0].className,
			});
		});
		setAdmins([...temp]);
	}, [data]);

	const handleChangeAuthority = (value: string) => {
		setAuthority(() => value);
	};

	const getAllAdminInfo = useCallback(async () => {
		await adminApi
			.getAllAdmin()
			.then((res) => {
				console.log(res);
				const temp: DataType[] = [];
				res.forEach((it) => {
					temp.push({
						key: it.adminId,
						name: it.adminName,
						email: it.adminEmail,
						rate: it.adminAuthority,
						imageSrc: it.adminProfileImg,
						class: it.classInfoResponses[0].className,
					});
				});
				setAdmins([...temp]);
			})
			.catch((err: AxiosError) => {
				Toast(false, err.message);
			});
	}, []);

	useEffect(() => {
		getAllAdminInfo();
	}, [getAllAdminInfo, authority]);

	const handleDelete = async (id: number) => {
		console.log('test');
		Alert('관리자 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then((result) => {
			// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) {
				updateAdmin({ isDeleted: true })
					.then(() => {
						Toast(true, '관리자 정보가 삭제되었습니다');
					})
					.catch((err: AxiosError) => Toast(false, err.message));
			}
		});
	};

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text} size="large" />,
			width: '100px',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
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
									<button type="button" onClick={showModal}>
										<SettingsOutlinedIcon className="mr-2" />
										수정
									</button>
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

	return {
		columns,
		admins,
		data,
		handleChangeAuthority,
	};
};
