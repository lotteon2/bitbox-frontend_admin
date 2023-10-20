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
	const [selectedClassId, setSelectedClassId] = useState<number>();

	const handleChangeSelectedClassId = useCallback((value: string) => {
		setSelectedClassId(Number(value));
		console.log(`selected ${value}`);
	}, []);

	const getAttendancesByClassId = async () => {
		if (!selectedClassId || myClassesOption.length > 0) return;
		await attendanceApi
			.getAttendanceInfoByClassIdForDashBoard(selectedClassId || myClassesOption[0].value)
			.then((res: BarChartDataType[]) => {
				setAttendanceData(res);
			});
	};

	const getGradesByClassId = useCallback(async () => {
		console.log(selectedClassId);
		if (!selectedClassId) return;
		await gradeApi
			.getGradesByClassId(selectedClassId)
			.then((res: GetGradesResponseData[]) => {
				const newGradeData: BarChartDataType[] = [];
				res.map((it) => newGradeData.push({ num: it.avgScore, name: it.examName }));
				setGradeData((prev) => newGradeData);
			})
			.catch((err) => {
				Toast(false, '반별 성적 데이터를 불러오는데 실패했습니다');
				return [];
			});
	}, []);

	useEffect(() => {
		if (!isLogin) {
			navigate('/login');
		}
		if (myClassesOption.length > 0) {
			// setSelectedClassId(() => myClassesOption[0].value);
			getGradesByClassId();
			getAttendancesByClassId();
		}
		console.log(myClassesOption);
		// getGradesByClassId(myClassesOption[0].value);
		// getAttendancesByClassId(myClassesOption[0].value);
	}, [isLogin, navigate, selectedClassId, myClassesOption, getGradesByClassId, getAttendancesByClassId]);

	return {
		getGradesByClassId,
		gradeData,
		myClassesOption,
		attendanceData,
		handleChangeSelectedClassId,
	};
};
