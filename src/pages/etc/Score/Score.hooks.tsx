import { useState, useEffect } from 'react';
import { Toast } from '../../../components/common/Toast';

export const useChangeScoreModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [score, setScore] = useState<number>();
	const [exam, setExam] = useState<string>();
	const [name, setName] = useState<string>();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		// setScore(0);
	};

	const showModal = (nameProp: string, scoreProp: number, examProp: string) => {
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

// export const useAddExamModal = () => {
// 	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isDisabled, setIsDisabled] = useState<boolean>(true);
// 	const [examName, setExamName] = useState<string>('');
// 	const [perfectScore, setPerfectScore] = useState<string>('');

// 	const clearValues = () => {
// 		setIsDisabled(true);
// 	};

// 	const showModal = () => {
// 		setIsModalOpen(true);
// 		setExamName('');
// 		setPerfectScore('');
// 	};

// 	const handleOk = () => {
// 		setIsLoading(true);
// 		Toast(true, '시험이 추가되었어요.');
// 		clearValues();
// 		setIsLoading(false);
// 		setIsModalOpen(false);
// 	};

// 	const handleCancel = () => {
// 		setIsModalOpen(false);
// 		clearValues();
// 	};

// 	useEffect(() => {
// 		if (examName && perfectScore) {
// 			setIsDisabled(false);
// 		}
// 	}, [examName, perfectScore]);

// 	return {
// 		examName,
// 		setExamName,
// 		perfectScore,
// 		setPerfectScore,
// 		isModalOpen,
// 		setIsModalOpen,
// 		isLoading,
// 		showModal,
// 		handleOk,
// 		handleCancel,
// 		isDisabled,
// 	};
// };

export const useAddScoreModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [examName, setExamName] = useState<string>('');
	const [perfectScore, setPerfectScore] = useState<string>('');

	const clearValues = () => {
		setIsDisabled(true);
	};

	const showModal = () => {
		setIsModalOpen(true);
		setExamName('');
		setPerfectScore('');
	};

	const handleOk = () => {
		setIsLoading(true);
		Toast(true, '성적이 등록되었어요.');
		clearValues();
		setIsLoading(false);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	useEffect(() => {
		if (examName && perfectScore) {
			setIsDisabled(false);
		}
	}, [examName, perfectScore]);

	return {
		examName,
		setExamName,
		perfectScore,
		setPerfectScore,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
		isDisabled,
	};
};
