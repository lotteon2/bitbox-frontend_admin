import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestUserPermission } from '../../hooks/App.hooks';
import { gradeApi } from '../../apis/grade/gradeAPIService.types';
import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';
import { Toast } from '../../components/common/Toast';
import { GetGradesResponseData } from '../../apis/grade/gradeAPIService';

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
	const { getGradesByClassId } = useDashBoard();
	const navigate = useNavigate();
	useEffect(() => {
		getGradesByClassId(1);
	}, [getGradesByClassId]);
	useEffect(() => {
		requestUserPermission(navigate);
	}, [navigate]);
};
