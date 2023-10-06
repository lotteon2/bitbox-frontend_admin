import { useState, useEffect } from 'react';
import { Toast } from '../../../components/common/Toast';

export const useChangeScoreModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [score, setScore] = useState<string>();
	const [exam, setExam] = useState<string>();
	const [name, setName] = useState<string>();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		// setScore(0);
	};

	const showModal = (nameProp: string, scoreProp: string, examProp: string) => {
		setIsModalOpen(true);
		setScore(scoreProp);
		setName(nameProp);
		setExam(examProp);
	};

	const handleOk = () => {
		setIsLoading(true);
		Toast(true, '성적이 변경되었어요.');
		clearValues();
		setIsLoading(false);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	useEffect(() => {
		if (score) {
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
