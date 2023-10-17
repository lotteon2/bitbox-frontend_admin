import { useState, useEffect } from 'react';
import { Toast } from '../components/common/Toast';

// Image, password, 이름 수정
export const useUpdateProfileModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [prevPassword, setPrevPassword] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		setEmail('');
		setName('');
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	/* TODO : 서버 통신 */
	const handleOk = () => {
		setIsLoading(true);
		Toast(true, '정보가 수정되었어요');
		clearValues();
		setIsLoading(false);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	useEffect(() => {
		if (email && name) {
			setIsDisabled(false);
		}
	}, [email, name]);

	return {
		email,
		setEmail,
		name,
		setName,
		prevPassword,
		setPrevPassword,
		password,
		setPassword,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		isDisabled,
		setIsLoading,
		showModal,
		handleOk,
		handleCancel,
	};
};
