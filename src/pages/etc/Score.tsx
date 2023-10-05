import { ColumnsType } from 'antd/es/table';
import { Avatar } from 'antd';
import BarChart from '../../components/DashBoard/BarChart';
import Button from '../../components/common/Button';
import SelectClass from '../../components/common/SelectClass';
import Table, { DataType } from '../../components/common/Table';
import { handleChange, options } from '../multi/Class/Class';
import TableStateChip from '../../components/common/TableStateChip';

const Score = () => {
	const chartData = [
		{
			name: 'HTML',
			num: 5,
		},
		{
			name: 'JAVA',
			num: 3,
		},
		{
			name: 'Spring',
			num: 1,
		},
		{
			name: 'React',
			num: 2,
		},
		{
			name: 'Jquery',
			num: 4,
		},
		{
			name: 'Vue',
			num: 2,
		},
	];

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text} size="large" />,
			align: 'center',
		},
		{
			title: '교육생',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: '시험명',
			dataIndex: 'exam',
			key: 'exam',
			align: 'center',
		},
		{
			title: '성적',
			dataIndex: 'score',
			key: 'score',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			render: (text: string) => <TableStateChip title={text} />,
		},
	];

	const data: DataType[] = [
		{
			key: '1',
			name: '김명준',
			imageSrc: '',
			exam: 'HTML',
			score: '90/100',
			state: '변경',
		},
		{
			key: '2',
			name: '김명준',
			imageSrc: '',
			exam: 'HTML',
			score: '90/100',
			state: '변경',
		},
		{
			key: '3',
			name: '김명준',
			imageSrc: '',
			exam: 'HTML',
			score: '90/100',
			state: '변경',
		},
	];
	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<div className="flex gap-x-10">
					<SelectClass handleChange={handleChange} options={options} />
					<SelectClass handleChange={handleChange} options={options} />
				</div>
				<div>
					<Button content="시험 추가" key="addExam" />
				</div>
			</div>
			<div className="flex justify-between h-2/3">
				<div className="flex justify-between flex-col gap-x-10 w-2/3">
					<BarChart chartName="평균 성적" data={chartData} />
					<BarChart chartName="명준이의 성적" data={chartData} />
				</div>
				<div className="">
					<Table data={data} columns={columns} />
				</div>
			</div>
			<div />
		</div>
	);
};
export default Score;
