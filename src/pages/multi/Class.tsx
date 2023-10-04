import { ColumnsType } from 'antd/es/table';
import Table, { DataType } from '../../components/common/Table';
import TableStateChip from '../../components/common/TableStateChip';
import SelectClass from '../../components/common/SelectClass';
import Button from '../../components/common/Button';

const columns: ColumnsType<DataType> = [
	{
		title: '반 이름',
		dataIndex: 'class',
		key: 'class',
		align: 'center',
	},
	{
		title: '반 코드',
		dataIndex: 'classCode',
		key: 'classCode',
		align: 'center',
	},
	{
		title: '수료 여부',
		dataIndex: 'isFinished',
		key: 'isFinished',
		align: 'center',
		render: (value: boolean) => <span>{value ? 'Y' : 'N'}</span>,
	},
	{
		title: '대표 담당자',
		dataIndex: 'name',
		key: 'name',
		render: (text: string) => <a href="/dashboard">{text}</a>,
		align: 'center',
	},
	{
		title: '',
		dataIndex: 'state',
		key: 'state',
		render: (text: string) => <TableStateChip title={text} />,
	},
];

export const data: DataType[] = [
	{
		key: '1',
		name: '매니저32',
		isFinished: false,
		class: '롯데e커머스 2기',
		classCode: 'JX411',
		email: 'abc@naver.com',
		state: '변경',
	},
	{
		key: '2',
		name: '안광현',
		class: '롯데e커머스 1기',
		isFinished: false,
		email: 'hi123@naver.com',
		state: '변경',
	},
	{
		key: '3',
		name: '마덤보',
		class: '롯데e커머스 2기',
		isFinished: true,
		email: 'hello@daum.com',
		state: '변경',
	},
	{
		key: '4',
		name: '강사3',
		email: 'hello@daum.com',
		isFinished: true,
		class: '코엑스 3기',
		state: '변경',
	},
	{
		key: '5',
		name: '강사3',
		isFinished: false,
		email: 'hello@daum.com',
		class: '코엑스 3기',
		state: '변경',
	},
	{
		key: '6',
		name: '학생10',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		isFinished: false,
		rate: '강사',
		state: '변경',
		classCode: 'JX415',
	},
	{
		key: '7',
		name: '학생5',
		email: 'hello@daum.com',
		classCode: 'JX411',
		class: '코엑스 3기',
		rate: '강사',
		isFinished: true,
		state: '변경',
	},
	{
		key: '8',
		name: '학생8',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		rate: '강사',
		state: '변경',
		isFinished: true,
		imageSrc: '',
	},
];

function Class() {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	// TODO: 초기 진입시 본인의 반 불러와서 options에 넣어주기
	const options = [
		{ value: 'jx411', label: '롯데이커머스2기' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
	];

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
				<Button content="클래스 추가" />
			</div>
			<Table data={data} columns={columns} />
		</div>
	);
}
export default Class;
