import { useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Avatar } from 'antd';
import { Toast } from '../../../components/common/Toast';
import TableStateChip from '../../../components/common/TableStateChip';
import { DataType } from '../../../components/common/Table';
import AttendanceState from '../../../components/common/AttendanceState';

export const useAttendanceModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [comment, setComment] = useState<string>(''); // comment
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const clearValues = () => {
		setIsDisabled(true);
		setComment('');
		setName('');
	};

	const showModal = (value: string) => {
		console.log(value);
		setName(() => value);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsLoading(true);
		Toast(true, '출석 상태가 변경되었어요.');
		clearValues();
		setIsLoading(false);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	useEffect(() => {
		if (name) {
			setIsDisabled(false);
			console.log(isModalOpen);
		}
	}, [name, isModalOpen]);

	return {
		isDisabled,
		setComment,
		comment,
		name,
		setName,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
	};
};
