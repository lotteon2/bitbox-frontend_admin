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
	const [classId, setClassId] = useState<number>(1);
	const [isLogin] = useUserStore((state) => [state.isLogin]);

	const getAttendancesByClassId = useCallback(async (id: number) => {
		await attendanceApi.getAttendanceInfoByClassIdForDashBoard(id).then((res: BarChartDataType[]) => {
			console.log(res);
		});
	}, []);

	const getGradesByClassId = useCallback(async (id: number) => {
		await gradeApi
			.getGradesByClassId(id)
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
		getGradesByClassId(classId);
		getAttendancesByClassId(classId);
	}, [isLogin, classId, getGradesByClassId, navigate, getAttendancesByClassId]);

	return {
		getGradesByClassId,
		gradeData,
	};
};

export const useDashBoardMount = () => {
	const { getGradesByClassId } = useDashBoard();
	useEffect(() => {
		getGradesByClassId(1);
	}, [getGradesByClassId]);
};
