import { useEffect, useState } from 'react';
import { Toast } from '../../../components/common/Toast';

export const useStudentModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

	/* TODO : 서버통신 */
	const handleClickAddBtn = (e: React.MouseEvent<Element, MouseEvent>) => {
		console.log(email);
		if (!email) {
			Toast(false, '이메일을 입력해주세요.');
		} else {
			/* TODO : 서버통신 */
			setInvitedEmails((prev) => [...prev, email]);
			setEmail('');
			Toast(true, '교육생이 초대되었습니다.');
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

	useEffect(() => {
		setEmail('');
	}, [invitedEmails]);

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
	};
};
