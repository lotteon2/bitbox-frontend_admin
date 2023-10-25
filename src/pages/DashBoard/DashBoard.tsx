import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import SelectClass from '../../components/common/SelectClass';
import BarChart from '../../components/DashBoard/BarChart';
import Table, { DataType } from '../../components/common/Table';
import { useDashBoard } from './DashBoard.hooks';
import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';

export const columns: ColumnsType<DataType> = [
	{
		title: '제목',
		dataIndex: 'title',
		key: 'title',
		render: (text) => <a href="/dashboard">{text}</a>,
	},
	{
		title: '내용',
		dataIndex: 'content',
		key: 'content',
	},
	{
		title: '사유일',
		dataIndex: 'date',
		key: 'date',
	},
	{
		title: '작성자',
		dataIndex: 'writer',
		key: 'writer',
	},
	{
		title: '상태',
		dataIndex: 'state',
		key: 'state',
		render: (text) => <a href="/dashboard">{text}</a>,
	},
];

export const data: DataType[] = [
	{
		key: 1,
		title: '사유서제출합니다',
		content: '입원으로 인해 결석합니다',
		date: '2023/09/21',
		writer: '가가가가',
		state: '반려',
	},
	{
		key: 2,
		title: '사유서제출합니다',
		content: '입원으로 인해 결석합니다',
		date: '2023/09/23',
		writer: '나나나나나',
		state: '승인',
	},
	{
		key: 3,
		title: '사유서제출합니다',
		content: '입원으로 인해 결석합니다',
		date: '2023/09/22',
		writer: '다다다다',
		state: '승인',
	},
];

const DashBoard = () => {
	const { gradeData, myClassesOption, handleChangeSelectedClassId, attendanceData } = useDashBoard();

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
				<Table data={data} columns={columns} tableName="사유서를 확인해주세요" />
			</div>
		</div>
	);
};
export default React.memo(DashBoard);
