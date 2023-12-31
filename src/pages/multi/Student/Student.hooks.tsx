import { useEffect, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { ColumnsType } from 'antd/es/table';
import { Dropdown } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Toast } from '../../../components/common/Toast';
import { useUserStore } from '../../../stores/user/user.store';
import { authApi } from '../../../apis/auth/authAPIService';
import { useCreateStudentMutation } from '../../../mutations/useCreateStudentMutation';
import { DataType } from '../../../components/common/Table';
import { useGetAllInvitedStudentQuery } from '../../../queries/useGetAllInvitedStudents';
import { useGetAllStudentQuery } from '../../../queries/useGetAllStudentQuery';
import { Alert } from '../../../components/common/Alert';
import { usePatchStudentMutation } from '../../../mutations/usePatchStudentMutation';
import { AUTHORITY } from '../../../constants/AuthorityType';
import { useClassStore } from '../../../stores/class/class.store';
import { useDeleteInvitedMutation } from '../../../mutations/useDeleteInvitedMutation';

export const useInvitedStudent = () => {
	const { refetch, data } = useGetAllInvitedStudentQuery();
	const { mutateAsync } = useDeleteInvitedMutation();
	const [invitedStudents, setInvitedStudents] = useState<DataType[]>([]);
	const handleDeleteInvitedStudent = async (email: string) => {
		await mutateAsync(email)
			.then((res) => {
				Toast(true, '교육생 초대가 취소되었어요.');
				refetch();
			})
			.catch((err) => {
				Toast(false, '교육생 초대 취소에 실패했어요.');
			});
	};

	const invitedStudentColumns: ColumnsType<DataType> = [
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '반',
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
			render: (text) => (
				<Dropdown
					className="cursor-pointer"
					menu={{
						items: [
							{
								key: 'deleteInvitedStudent',
								label: (
									<button type="button" onClick={() => handleDeleteInvitedStudent(text)}>
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

	useEffect(() => {
		if (!data?.length) {
			setInvitedStudents([]);
			return;
		}
		const temp: DataType[] = [];
		data.forEach((it, idx) => {
			temp.push({
				key: idx,
				class: it.className,
				email: it.email,
				state: it.email,
			});
			setInvitedStudents([...temp]);
		});
	}, [data]);

	return {
		invitedStudents,
		invitedStudentColumns,
	};
};

export const useStudentModal = () => {
	const navigate = useNavigate();
	const { refetch } = useGetAllInvitedStudentQuery();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
	const [isLogin, myClassesOption, myClasses] = useUserStore((state) => [
		state.isLogin,
		state.myClassesOption,
		state.myClasses,
	]);
	const [classId, dispatchClassId, classValue, dispatchClassValue] = useClassStore((state) => [
		state.classId,
		state.dispatchSelectedClassId,
		state.classValue,
		state.dispatchSelectedClassValue,
	]);
	const [studentsData, setStudentsData] = useState<DataType[]>([]);

	const { mutateAsync } = useCreateStudentMutation();
	const { mutateAsync: mutateUpdateStudentAsync } = usePatchStudentMutation();
	const { data, fetchQuery, refetch: refetchAllStudent } = useGetAllStudentQuery();

	const handleDeleteStudent = async (id: string) => {
		await mutateUpdateStudentAsync({ memberId: id, memberAuthority: AUTHORITY.GENERAL })
			.then((res) => {
				Toast(true, '교육생 정보가 삭제되었습니다.');
				refetchAllStudent();
			})
			.catch((err: AxiosError) => Toast(false, '교육생 정보 삭제에 실패했어요.'));
	};

	const handleDeleteStudentAlert = (id: string) => {
		Alert({ title: '교육생 정보를 삭제하시겠습니까?', text: '삭제하시면 되돌릴 수 없습니다' }).then((result) => {
			if (result.isConfirmed) {
				handleDeleteStudent(id);
			}
		});
	};

	const studentColumns: ColumnsType<DataType> = [
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
			title: '반',
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
			render: (text) => (
				<button type="button" onClick={() => handleDeleteStudentAlert(text)}>
					<DeleteOutlineOutlinedIcon className="mr-2" />
				</button>
			),
		},
	];

	const handleClickAddBtn = async (e: React.MouseEvent<Element, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email) {
			Toast(false, '이메일을 입력해주세요.');
		} else {
			const { classCode } = myClasses[myClasses.findIndex((it) => it.classId === classId)];
			const { className } = myClasses[myClasses.findIndex((it) => it.classId === classId)];
			await mutateAsync({ email, classId, classCode, className })
				.then((res) => {
					setInvitedEmails((prev) => [...prev, email]);
					setEmail('');
					Toast(true, '교육생이 초대되었습니다.');
					refetch();
					const templateParams = {
						name: email,
					};

					emailjs.send('service_7t9od8h', 'template_nh61f8q', templateParams, 'pSia3ISCGBQ7MtMZk').then(
						(result: any) => {
							Toast(true, '교육생에게 이메일이 발송되었습니다.');
						},
						(error: any) => {
							Toast(false, '교육생에게 이메일이 발송되지 않았습니다.');
						},
					);
				})
				.catch((err) => {
					Toast(false, '교육생 초대에 실패하였습니다.');
				});
			await authApi.getAllInvitedStudents();
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setInvitedEmails([]);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setInvitedEmails([]);
	};

	const handleChangeSelectedClassId = useCallback((value: string) => {
		dispatchClassId(Number(value));
		const selectedOption = myClassesOption[myClassesOption.findIndex((myClass) => myClass.value === Number(value))];
		dispatchClassValue(selectedOption.label);
	}, []);

	useEffect(() => {
		const temp: DataType[] = [];
		if (!data) {
			return;
		}
		data.memberInfoList?.forEach((it, idx) => {
			const className = myClassesOption[myClassesOption.findIndex((myClass) => myClass.value === classId)].label;
			temp.push({
				key: idx,
				state: it.memberId,
				name: it.memberName,
				email: it.memberEmail,
				class: className,
				imageSrc: it.memberProfileImg,
			});
		});
		setStudentsData([...temp]);
	}, [data]);

	useEffect(() => {
		fetchQuery();
	}, [classId]);

	useEffect(() => {
		setEmail('');
		if (myClassesOption.length > 0) {
			if (classId === -1) {
				dispatchClassId(myClassesOption[0].value);
			}
		}
	}, [invitedEmails, isLogin, myClassesOption, navigate, classId]);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		dispatchClassValue(myClassesOption[0].label);
		return () => {
			dispatchClassId(-1);
		};
	}, []);

	return {
		email,
		setEmail,
		handleClickAddBtn,
		invitedEmails,
		setInvitedEmails,
		isModalOpen,
		setIsModalOpen,
		loading,
		setLoading,
		showModal,
		handleOk,
		handleCancel,
		myClassesOption,
		handleChangeSelectedClassId,
		studentsData,
		studentColumns,
		classId,
		classValue,
	};
};
