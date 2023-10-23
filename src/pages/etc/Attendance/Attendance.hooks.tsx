import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Avatar } from 'antd';
import { Toast } from '../../../components/common/Toast';
import TableStateChip from '../../../components/common/TableStateChip';
import { DataType } from '../../../components/common/Table';
import AttendanceState from '../../../components/common/AttendanceState';
import { attendanceApi } from '../../../apis/attendance/attendanceAPIService';
import { useGetAllAttendanceQuery } from '../../../queries/useGetAllAttendanceQuery';
import { useUserStore } from '../../../stores/user/user.store';
import { useClassStore } from '../../../stores/class/class.store';

export const useAttendanceModal = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [comment, setComment] = useState<string>(''); // comment
	const [name, setName] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [isLogin, myClassesOption, myClasses] = useUserStore((state) => [
		state.isLogin,
		state.myClassesOption,
		state.myClasses,
	]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		return () => {
			dispatchClassId(-1);
		};
	}, []);

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

// const data: DataType[] = [
// 	{
// 		key: 1,
// 		name: '김명준',
// 		attendanceState: '결석',
// 		entranceTime: '',
// 		quitTime: '',
// 		attendanceModifyReason: '개인 사정으로 인한 결석',
// 		state: '변경',
// 		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
// 	},
// 	{
// 		key: 2,
// 		name: '김정윤',
// 		attendanceState: '출석',
// 		entranceTime: '2023/09/08 8:30',
// 		quitTime: '2023/09/08 22:00',
// 		attendanceModifyReason: '',
// 		state: '변경',
// 		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
// 	},
// 	{
// 		key: 3,
// 		name: '마혜경',
// 		attendanceState: '외출',
// 		entranceTime: '2023/09/08 8:30',
// 		quitTime: '2023/09/08 22:00',
// 		attendanceModifyReason: '병원으로 인한 외출',
// 		state: '변경',
// 	},
// ];

export const useAttendanceTable = () => {
	const [userData, setUserData] = useState<DataType[]>([]);
	const { data } = useGetAllAttendanceQuery();
	const { showModal } = useAttendanceModal();

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text} size="large" />,
			width: '100px',
		},
		{
			title: '교육생',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '출석 상태',
			dataIndex: 'attendanceState',
			key: 'attendanceState',
			render: (text) => (
				<div className="w-full">
					<AttendanceState status={text} />
				</div>
			),
			align: 'center',
			width: '100px',
		},
		{
			title: '입실시간',
			dataIndex: 'entranceTime',
			key: 'entranceTime',
			align: 'center',
		},
		{
			title: '퇴실시간',
			dataIndex: 'quitTime',
			key: 'quitTime',
			align: 'center',
		},
		{
			title: '참고',
			dataIndex: 'attendanceModifyReason',
			key: 'attendanceModifyReason',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			render: (text, a, id) => <TableStateChip title={text} handleClick={() => showModal(userData[id].name || '')} />,
		},
	];

	const getData = async () => {
		await attendanceApi.getAllAttendanceInfo(1).then((res) => {
			console.log(res);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return {
		userData,
		columns,
	};
};
