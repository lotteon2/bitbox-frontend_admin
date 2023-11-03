import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Avatar, DatePickerProps } from 'antd';
import { AxiosError } from 'axios';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import dayjs from 'dayjs';
import { Toast } from '../../../components/common/Toast';
import { DataType } from '../../../components/common/Table';
import AttendanceState from '../../../components/common/AttendanceState';
import { useGetAllAttendanceQuery } from '../../../queries/useGetAllAttendanceQuery';
import { useUserStore } from '../../../stores/user/user.store';
import { useClassStore } from '../../../stores/class/class.store';
import { usePatchAttendanceMutation } from '../../../mutations/usePatchAttendanceMutation';
import { ATTENDANCE } from '../../../constants/AttendanceType';
import { useAttendanceSearchStore } from '../../../stores/attendanceSearch/attendanceSearch.store';

export const useAttendanceModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [comment, setComment] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [attendanceState, setAttendanceState] = useState<string>(ATTENDANCE.ATTENDANCE);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [selectedColumnIdx, setSelectedColumnIdx] = useState<number>(-1);

	const { mutateAsync } = usePatchAttendanceMutation();
	const { refetch, data } = useGetAllAttendanceQuery();

	const clearValues = () => {
		setIsDisabled(true);
		setComment('');
	};

	const handleChangeAttendance = (value: string) => {
		setAttendanceState(() => value);
	};

	const showModal = (value: number, initAttendanceState: keyof typeof ATTENDANCE, initName: string) => {
		setSelectedColumnIdx(value);
		setIsModalOpen(true);
		setAttendanceState(initAttendanceState);
		setName(initName);
	};

	const handleOk = async () => {
		setIsLoading(true);
		await mutateAsync({ attendanceId: selectedColumnIdx, attendanceState, attendanceModifyReason: comment })
			.then((res) => {
				Toast(true, '출석 상태가 변경되었어요.');
				clearValues();
				setIsModalOpen(false);
				refetch();
			})
			.catch((err: AxiosError) => {
				Toast(false, '출석 상태 변경에 실패했어요.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		clearValues();
	};

	useEffect(() => {
		if (!data || selectedColumnIdx === -1) return;
		const prev = data.findIndex((it) => it.attendanceId === selectedColumnIdx);
		if (
			data[prev].attendanceState !== undefined &&
			data[prev].attendanceState &&
			attendanceState !== data[prev].attendanceState
		) {
			setIsDisabled(false);
		} else setIsDisabled(true);
	}, [attendanceState]);

	return {
		isDisabled,
		setComment,
		comment,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		showModal,
		handleOk,
		handleCancel,
		name,
		attendanceState,
		handleChangeAttendance,
	};
};

export const useAttendanceTable = () => {
	const navigate = useNavigate();
	const [attendanceData, setAttendanceData] = useState<DataType[]>([]);
	const {
		showModal,
		isModalOpen: isUpdateModalOpen,
		isDisabled: isUpdateModalDisabled,
		isLoading: isUpdateModalLoading,
		handleCancel: handleUpdateModalCancel,
		handleOk: handleUpdateModalOk,
		name,
		attendanceState,
		comment,
		setComment,
		handleChangeAttendance,
	} = useAttendanceModal();
	const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
	const [selectedDateString, dispatchSelectedDateString, searchName, dispatchSearchName] = useAttendanceSearchStore(
		(state) => [state.selectedDateString, state.dispatchSelectedDateString, state.searchName, state.dispatchSearchName],
	);

	const [isLogin, myClassesOption, myClasses] = useUserStore((state) => [
		state.isLogin,
		state.myClassesOption,
		state.myClasses,
	]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);

	/* react-query */
	const { data, fetchQuery, refetch } = useGetAllAttendanceQuery();

	const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
		setSelectedDate(date);
		dispatchSelectedDateString(dateString);
	};

	const handleChangeSelectedClassId = (value: string) => {
		dispatchClassId(Number(value));
	};

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}

		return () => {
			dispatchClassId(-1);
		};
	}, []);

	useEffect(() => {
		fetchQuery();
	}, [classId]);

	useEffect(() => {
		if (!data?.length) {
			setAttendanceData([]);
			return;
		}
		if (myClassesOption.length > 0) {
			if (classId === -1) {
				dispatchClassId(myClassesOption[0].value);
			}
		}
	}, [classId, myClassesOption]);

	useEffect(() => {
		if (!data?.length) {
			setAttendanceData([]);
			return;
		}
		const temp: DataType[] = [];
		data.forEach((it, idx) => {
			temp.push({
				key: it.attendanceId,
				attendanceState: it.attendanceState,
				attendanceModifyReason: it.attendanceModifyReason,
				entranceTime: it.entrace,
				quitTime: it.quit,
				imageSrc: it.memberProfileImg,
				name: it.memberName,
			});
			setAttendanceData([...temp]);
		});
	}, [data]);

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text || null} size="large" />,
			width: '100px',
		},
		{
			title: '교육생',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text) => <span>{text}</span>,
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
			render: (text) => <span>{text}</span>,
		},
		{
			title: '퇴실시간',
			dataIndex: 'quitTime',
			key: 'quitTime',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '참고',
			dataIndex: 'attendanceModifyReason',
			key: 'attendanceModifyReason',
			align: 'center',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			align: 'right',
			render: (text, a, id) => (
				<button
					type="button"
					onClick={() =>
						showModal(
							attendanceData[id].key,
							attendanceData[id].attendanceState as keyof typeof ATTENDANCE,
							attendanceData[id].name || '',
						)
					}
				>
					<SettingsOutlinedIcon className="mr-2" />
					수정
				</button>
			),
		},
	];

	return {
		attendanceData,
		columns,
		myClassesOption,
		handleChangeSelectedClassId,
		isUpdateModalOpen,
		handleUpdateModalCancel,
		handleUpdateModalOk,
		name,
		attendanceState,
		comment,
		setComment,
		isUpdateModalDisabled,
		isUpdateModalLoading,
		handleChangeAttendance,
		onChangeDate,
		selectedDate,
		searchName,
		dispatchSearchName,
	};
};
