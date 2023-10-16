import { ColumnsType } from 'antd/es/table';
import SelectClass from '../components/common/SelectClass';
import BarChart from '../components/DashBoard/BarChart';
import Table, { DataType } from '../components/common/Table';

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

export default function DashBoard() {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	// TODO: 초기 진입시 본인의 반 불러와서 options에 넣어주기
	const options = [
		{ value: 'jx411', label: '롯데이커머스2기' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
	];

	// TODO : 반별 출석률 + 평균 성적 전역 관리
	const chartData = [
		{
			name: '09/26',
			num: 5,
		},
		{
			name: '09/27',
			num: 3,
		},
		{
			name: '09/28',
			num: 1,
		},
		{
			name: '09/29',
			num: 2,
		},
		{
			name: '09/30',
			num: 4,
		},
		{
			name: '09/31',
			num: 2,
		},
	];

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="h-1/2">
				<SelectClass handleChange={handleChange} options={options} />
				<div className="flex justify-between w-full">
					<BarChart chartName="출석률" data={chartData} />
					<BarChart chartName="평균 성적" data={chartData} />
				</div>
			</div>
			<div className="h-1/2">
				<Table data={data} columns={columns} tableName="사유서를 확인해주세요" />
			</div>
		</div>
	);
}
