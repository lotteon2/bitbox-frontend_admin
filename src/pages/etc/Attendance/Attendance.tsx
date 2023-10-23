import { ColumnsType } from 'antd/es/table';
import { Avatar, DatePicker, DatePickerProps, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import Table, { DataType } from '../../../components/common/Table';
import TableStateChip from '../../../components/common/TableStateChip';
import AttendanceState from '../../../components/common/AttendanceState';
import SelectClass from '../../../components/common/SelectClass';
import { useAttendanceModal, useAttendanceTable } from './Attendance.hooks';
import Button from '../../../components/common/Button';

const Attendance = () => {
	const { isModalOpen, isDisabled, isLoading, comment, name, setName, setComment, handleOk, handleCancel } =
		useAttendanceModal();

	const { userData, columns } = useAttendanceTable();

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
		<div className="ml-10 w-11/12 h-full mt-10">
			<div className="flex justify-between w-full my-5">
				<div>
					<SelectClass handleChange={handleChange} options={options} />
					<DatePicker onChange={onChange} className="ml-5" />
				</div>
				<div className="w-1/3">
					<Search placeholder="이름을 검색해주세요" allowClear />
				</div>
			</div>
			<Table data={userData} columns={columns} />
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
