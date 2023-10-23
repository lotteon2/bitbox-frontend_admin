import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../components/common/Toast';
import { useUserStore } from '../../../stores/user/user.store';
import { authApi } from '../../../apis/auth/authAPIService';
import { useCreateStudentMutation } from '../../../mutations/useCreateStudentMutation';

export const useStudentModal = () => {
	const navigate = useNavigate();
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
				})
				.catch((err) => {
					Toast(false, '교육생 초대에 실패하였습니다.');
				});
			console.log(classCode, className, selectedClassId, email);
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
