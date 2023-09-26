import { ColumnsType } from 'antd/es/table';
import { Avatar } from 'antd';
import Table, { DataType } from '../../components/common/Table';
import TableStateChip from '../../components/common/TableStateChip';

const columns: ColumnsType<DataType> = [
	{
		title: '',
		dataIndex: 'imageSrc',
		key: 'imageSrc',
		render: (text) => <Avatar src={text} size="large" />,
		width: '100px',
	},
	{
		title: '이름',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a href="/dashboard">{text}</a>,
		align: 'center',
	},
	{
		title: '이메일',
		dataIndex: 'email',
		key: 'email',
		render: (text) => <a href="/dashboard">{text}</a>,
		align: 'center',
	},
	{
		title: '반',
		dataIndex: 'class',
		key: 'class',
		align: 'center',
	},
	{
		title: '',
		dataIndex: 'state',
		key: 'state',
		render: (text) => <TableStateChip title={text} />,
	},
];

export const data: DataType[] = [
	{
		key: '1',
		name: '김명준',
		class: '롯데e커머스 2기',
		email: 'abc@naver.com',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '2',
		name: '안광현',
		class: '롯데e커머스 1기',
		email: 'hi123@naver.com',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '3',
		name: '마덤보',
		class: '롯데e커머스 2기',
		email: 'hello@daum.com',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '4',
		name: '강사3',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '5',
		name: '강사3',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '6',
		name: '학생10',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		rate: '강사',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '7',
		name: '학생5',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		rate: '강사',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: '8',
		name: '학생8',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		rate: '강사',
		state: '변경',
		imageSrc: '',
	},
];

function Student() {
	return (
		<div className="ml-10 w-11/12 h-full">
			<Table data={data} columns={columns} />
		</div>
	);
}
export default Student;
