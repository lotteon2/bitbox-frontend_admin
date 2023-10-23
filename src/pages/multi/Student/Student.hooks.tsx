import { useEffect, useState, useCallback } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Dropdown } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../components/common/Toast';
import { useUserStore } from '../../../stores/user/user.store';
import { authApi } from '../../../apis/auth/authAPIService';
import { useCreateStudentMutation } from '../../../mutations/useCreateStudentMutation';
import { DataType } from '../../../components/common/Table';
import { useGetAllInvitedStudentQuery } from '../../../queries/useGetAllInvitedStudents';

export const useInvitedStudent = () => {
	const { refetch, data } = useGetAllInvitedStudentQuery();
	const [invitedStudents, setInvitedStudents] = useState<DataType[]>([]);
	const handleDeleteInvitedStudent = (studentId: number) => {
		console.log(studentId);
	};

	const invitedStudentColumns: ColumnsType<DataType> = [
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '반',
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
								key: 'deleteInvitedStudent',
								label: (
									<button type="button" onClick={() => handleDeleteInvitedStudent(1)}>
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
		if (!data) return;
		const temp: DataType[] = [];
		data.forEach((it, idx) => {
			temp.push({
				key: idx,
				class: it.className,
				email: it.email,
				state: it.classCode,
			});
			setInvitedStudents([...temp]);
		});
	}, [data, refetch]);

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
	const [selectedClassId, setSelectedClassId] = useState<number>(myClassesOption[0]?.value);

	const { mutateAsync } = useCreateStudentMutation();

	const handleClickAddBtn = async (e: React.MouseEvent<Element, MouseEvent>) => {
		console.log(email);
		if (!email) {
			Toast(false, '이메일을 입력해주세요.');
		} else {
			const { classCode } = myClasses[myClasses.findIndex((it) => it.classId === selectedClassId)];
			const { className } = myClasses[myClasses.findIndex((it) => it.classId === selectedClassId)];
			console.log(classCode, className, selectedClassId, email);
			await mutateAsync({ email, classId: selectedClassId, classCode, className })
				.then((res) => {
					console.log(res);
					setInvitedEmails((prev) => [...prev, email]);
					setEmail('');
					Toast(true, '교육생이 초대되었습니다.');
					refetch();
				})
				.catch((err) => {
					Toast(false, '교육생 초대에 실패하였습니다.');
				});
			console.log(classCode, className, selectedClassId, email);
			await authApi.getAllInvitedStudents().then((res) => console.log('res', res));
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	/* TODO : 서버통신 */
	const handleOk = () => {
		setIsModalOpen(false);
		setInvitedEmails([]);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setInvitedEmails([]);
	};

	const handleChangeSelectedClassId = useCallback((value: string) => {
		setSelectedClassId(Number(value));
		console.log(`selected ${value}`);
	}, []);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		setEmail('');
	}, [invitedEmails, isLogin, navigate]);

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
	};
};
