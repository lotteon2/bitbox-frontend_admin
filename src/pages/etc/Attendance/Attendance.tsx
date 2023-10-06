import { ColumnsType } from 'antd/es/table';
import { Avatar, DatePicker, DatePickerProps, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import Table, { DataType } from '../../../components/common/Table';
import TableStateChip from '../../../components/common/TableStateChip';
import AttendanceState from '../../../components/common/AttendanceState';
import SelectClass from '../../../components/common/SelectClass';
import { useAttendanceModal } from './Attendance.hooks';
import Button from '../../../components/common/Button';

const Attendance = () => {
	const { isModalOpen, isDisabled, isLoading, comment, name, setName, setComment, showModal, handleOk, handleCancel } =
		useAttendanceModal();

	const data: DataType[] = [
		{
			key: '1',
			name: '김명준',
			attendanceState: '결석',
			entranceTime: '',
			quitTime: '',
			attendanceModifyReason: '개인 사정으로 인한 결석',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '2',
			name: '김정윤',
			attendanceState: '출석',
			entranceTime: '2023/09/08 8:30',
			quitTime: '2023/09/08 22:00',
			attendanceModifyReason: '',
			state: '변경',
			imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
		},
		{
			key: '3',
			name: '마혜경',
			attendanceState: '외출',
			entranceTime: '2023/09/08 8:30',
			quitTime: '2023/09/08 22:00',
			attendanceModifyReason: '병원으로 인한 외출',
			state: '변경',
		},
		{
			key: '4',
			name: '최성훈',
			attendanceState: '지각',
			entranceTime: '2023/09/08 10:30',
			quitTime: '2023/09/08 22:00',
			attendanceModifyReason: '',
			state: '변경',
		},
		{
			key: '5',
			name: '전종민',
			attendanceState: '지각',
			entranceTime: '2023/09/08 10:30',
			quitTime: '2023/09/08 22:00',
			attendanceModifyReason: '',
			state: '변경',
		},
	];

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text} size="large" />,
			width: '100px',
		},
		{
			title: '교육생',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a href="/dashboard">{text}</a>,
			align: 'center',
		},
		{
			title: '출석 상태',
			dataIndex: 'attendanceState',
			key: 'attendanceState',
			render: (text) => (
				<div className="w-full">
					<AttendanceState status={text} />
				</div>
			),
			align: 'center',
			width: '100px',
		},
		{
			title: '입실시간',
			dataIndex: 'entranceTime',
			key: 'entranceTime',
			align: 'center',
		},
		{
			title: '퇴실시간',
			dataIndex: 'quitTime',
			key: 'quitTime',
			align: 'center',
		},
		{
			title: '참고',
			dataIndex: 'attendanceModifyReason',
			key: 'attendanceModifyReason',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			render: (text, a, id) => <TableStateChip title={text} handleClick={() => showModal(data[id].name || '')} />,
		},
	];

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	// TODO: 초기 진입시 본인의 반 불러와서 options에 넣어주기
	const options = [
		{ value: 'jx411', label: '롯데이커머스2기' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
	];

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	};

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<div>
					<SelectClass handleChange={handleChange} options={options} />
					<DatePicker onChange={onChange} className="ml-5" />
				</div>
				<div className="w-1/3">
					<Search placeholder="이름을 검색해주세요" allowClear />
				</div>
			</div>
			<Table data={data} columns={columns} />
			<Modal
				title="출석 상태 변경"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="a" />,
					<Button
						handleClick={handleOk}
						content="변경"
						loading={isLoading}
						disabled={isDisabled}
						type="positive"
						key="c"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div>
						<input defaultValue={name} id="swal2-input" className="swal2-input" readOnly disabled />
						<SelectClass options={options} handleChange={handleChange} />
					</div>
					<br />
					<br />
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						id="swal2-textarea"
						className="swal2-textarea"
					/>
				</div>
			</Modal>
		</div>
	);
};
export default Attendance;
