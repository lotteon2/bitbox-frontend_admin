import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { Toast } from '../components/common/Toast';
import { useGetAllAdminQuery } from '../queries/useGetAllAdminQuery';
import { usePatchAdminMutation } from '../mutations/usePatchAdminMutation';
import { AUTHORITY } from '../constants/AuthorityType';
import { GetAdminInfoResponseData } from '../apis/admin/adminAPIService.types';

// Image, password, 이름 수정
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
