import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestUserPermission } from '../../hooks/App.hooks';
import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';
import { Toast } from '../../components/common/Toast';
import { gradeApi } from '../../apis/grade/gradeAPIService';
import { GetGradesResponseData } from '../../apis/grade/gradeAPIService.types';

export const useDashBoard = () => {
	const [gradeData, setGradeData] = useState<BarChartDataType[]>();
	const [classId, setClassId] = useState<number>(1);
	const navigate = useNavigate();

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
		getGradesByClassId(classId);
	}, [classId, getGradesByClassId]);

	return {
		getGradesByClassId,
		gradeData,
	};
};

export const useAppMount = () => {
    console.log('hre');
	const { getGradesByClassId } = useDashBoard();
	const navigate = useNavigate();
	useEffect(() => {
		getGradesByClassId(1);
	}, [getGradesByClassId]);
	useEffect(() => {
		requestUserPermission(navigate);
	}, [navigate]);
};