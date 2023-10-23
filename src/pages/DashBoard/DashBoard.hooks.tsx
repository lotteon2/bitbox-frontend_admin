import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';
import { Toast } from '../../components/common/Toast';
import { gradeApi } from '../../apis/grade/gradeAPIService';
import { GetGradesResponseData } from '../../apis/grade/gradeAPIService.types';
import { useUserStore } from '../../stores/user/user.store';
import { attendanceApi } from '../../apis/attendance/attendanceAPIService';

export const useDashBoard = () => {
	const navigate = useNavigate();
	const [gradeData, setGradeData] = useState<BarChartDataType[]>();
	const [attendanceData, setAttendanceData] = useState<BarChartDataType[]>();
	const [isLogin, myClassesOption] = useUserStore((state) => [state.isLogin, state.myClassesOption]);
	const [selectedClassId, setSelectedClassId] = useState<number>(-1);

	const handleChangeSelectedClassId = (value: string) => {
		setSelectedClassId(() => Number(value));
		getAttendancesByClassId(Number(value));
		getGradesByClassId(Number(value));
		console.log(`selected ${value}`);
	};

	const getAttendancesByClassId = useCallback(
		async (classId: number) => {
			console.log('getAttendancesByClassId', selectedClassId);
			if (!selectedClassId) return;
			await attendanceApi
				.getAttendanceInfoByClassIdForDashBoard(classId || myClassesOption[0].value)
				.then((res: BarChartDataType[]) => {
					setAttendanceData(res);
					console.log(attendanceData);
				});
		},
		[selectedClassId],
	);

	const getGradesByClassId = useCallback(
		async (classId: number) => {
			console.log('getGradesByClassId', selectedClassId);
			if (!selectedClassId) return;
			await gradeApi
				.getGradesByClassId(classId)
				.then((res: GetGradesResponseData[]) => {
					const newGradeData: BarChartDataType[] = [];
					res.map((it) => newGradeData.push({ num: it.avgScore, name: it.examName }));
					setGradeData((prev) => newGradeData);
				})
				.catch((err) => {
					Toast(false, '반별 성적 데이터를 불러오는데 실패했습니다');
					return [];
				});
		},
		[selectedClassId],
	);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		if (myClassesOption.length > 0) {
			if (selectedClassId === -1) {
				setSelectedClassId(() => myClassesOption[0].value);
			}
			console.log('selectedClassId', selectedClassId);
			getGradesByClassId(selectedClassId);
			getAttendancesByClassId(selectedClassId);
		}
		console.log(myClassesOption);
	}, [isLogin, navigate, selectedClassId, myClassesOption, getGradesByClassId, getAttendancesByClassId]);

	return {
		getGradesByClassId,
		gradeData,
		myClassesOption,
		attendanceData,
		handleChangeSelectedClassId,
	};
};
