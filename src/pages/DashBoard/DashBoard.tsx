import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import SelectClass from '../../components/common/SelectClass';
import BarChart from '../../components/DashBoard/BarChart';
import Table, { DataType } from '../../components/common/Table';
import { useDashBoard } from './DashBoard.hooks';
import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';

const DashBoard = () => {
	const navigate = useNavigate();
	const { columns, gradeData, myClassesOption, handleChangeSelectedClassId, attendanceData, requestData } =
		useDashBoard();

	return (
		<div>
			<div className="h-1/2">
				<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
				<div className="flex justify-between w-full">
					<BarChart chartName="출석률" data={attendanceData as BarChartDataType[]} />
					<BarChart chartName="평균 성적" data={gradeData as BarChartDataType[]} />
				</div>
			</div>
			<div className="h-1/2">
				<Table
					data={requestData}
					columns={columns}
					tableName="사유서를 확인해주세요"
					handleClick={() => navigate('/etc/request')}
				/>
			</div>
		</div>
	);
};
export default React.memo(DashBoard);
