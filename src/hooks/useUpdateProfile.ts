import { useState } from 'react';

export const useUpdateProfileModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	return {
		isModalOpen,
		setIsModalOpen,
		isLoading,
		isDisabled,
		setIsDisabled,
		setIsLoading,
		showModal,
		handleCancel,
		clearValues,
	};
};
