import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';
import { Toast } from '../../components/common/Toast';
import { useUserStore } from '../../stores/user/user.store';
import { attendanceApi } from '../../apis/attendance/attendanceAPIService';
import { DataType } from '../../components/common/Table';
import { useGetAllRequestQuery } from '../../queries/useGetAllRequestQuery';
import { useClassStore } from '../../stores/class/class.store';
import TableStateChip from '../../components/common/TableStateChip';
import { useGetGradeByClassIdForDashBoardQuery } from '../../queries/useGetGradeByClassIdForDashBoardQuery';
import { useGetAttendanceByClassIdForDashBoardQuery } from '../../queries/useGetAttendanceByClassIdForDashBoard';

export const useDashBoard = () => {
	const navigate = useNavigate();
	const [gradeData, setGradeData] = useState<BarChartDataType[]>();
	const [attendanceData, setAttendanceData] = useState<BarChartDataType[]>();
	const [isLogin, myClassesOption] = useUserStore((state) => [state.isLogin, state.myClassesOption]);
	const [classId, dispatchClassId] = useClassStore((state) => [state.classId, state.dispatchSelectedClassId]);

	const [requestData, setRequestData] = useState<DataType[]>([]);

	const { data } = useGetAllRequestQuery();
	const { data: dashboardGradeData } = useGetGradeByClassIdForDashBoardQuery();
	const { data: dashboardAttendanceData } = useGetAttendanceByClassIdForDashBoardQuery();

	const handleChangeSelectedClassId = (value: string) => {
		dispatchClassId(Number(value));
	};

	useEffect(() => {
		if (!data?.reasonStatements?.length) {
			setRequestData([]);
			return;
		}
		if (myClassesOption.length > 0) {
			if (classId === -1) {
				dispatchClassId(myClassesOption[0].value);
			}
		}
	}, [classId, myClassesOption]);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		if (myClassesOption.length > 0) {
			if (classId === -1) {
				dispatchClassId(myClassesOption[0].value);
			}
		}
	}, [isLogin, classId]);

	useEffect(() => {
		if (!data?.reasonStatements?.length) {
			setRequestData([]);
			return;
		}
		const temp: DataType[] = [];
		data.reasonStatements.forEach((it) => {
			temp.push({
				key: it.reasonStatementId,
				title: it.reasonTitle,
				content: it.reasonContent,
				date: it.attendanceDate,
				name: it.memberName,
				isRead: it.read,
				reasonState: it.reasonState,
			});
			setRequestData([...temp]);
		});
	}, [data]);

	useEffect(() => {
		if (!dashboardGradeData) {
			setGradeData([]);
			return;
		}
		const newGradeData: BarChartDataType[] = [];
		dashboardGradeData.map((it) => newGradeData.push({ num: it.avgScore, name: it.examName }));
		setGradeData([...newGradeData]);
	}, [dashboardGradeData]);

	useEffect(() => {
		if (!dashboardAttendanceData) {
			setAttendanceData([]);
			return;
		}
		setAttendanceData([...dashboardAttendanceData]);
	}, [dashboardAttendanceData]);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		return () => {
			dispatchClassId(-1);
		};
	}, []);

	const columns: ColumnsType<DataType> = [
		{
			dataIndex: 'key',
			key: 'key',
			width: '0px',
		},
		{
			title: '제목',
			dataIndex: 'title',
			key: 'title',
			render: (text) => <span>{text}</span>,
		},
		{
			title: '내용',
			dataIndex: 'content',
			key: 'content',
			render: (text: string) => <span>{text.length > 12 ? text.slice(0, 10).concat('...') : text}</span>,
			align: 'center',
		},
		{
			title: '사유일자',
			dataIndex: 'date',
			key: 'date',
			align: 'center',
		},
		{
			title: '작성자',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'reasonState',
			key: 'reasonState',
			align: 'center',
			width: '100px',
			render: (text) => (
				<div className="w-full">
					<TableStateChip title={text} />
				</div>
			),
		},
		{
			key: 'isRead',
			dataIndex: 'isRead',
		},
	];

	return {
		gradeData,
		myClassesOption,
		attendanceData,
		handleChangeSelectedClassId,
		requestData,
		columns,
	};
};
