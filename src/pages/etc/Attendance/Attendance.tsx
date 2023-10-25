import { DatePicker, DatePickerProps, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import locale from 'antd/es/date-picker/locale/ko_KR';
import Table, { DataType } from '../../../components/common/Table';
import SelectClass from '../../../components/common/SelectClass';
import { useAttendanceModal, useAttendanceTable } from './Attendance.hooks';
import Button from '../../../components/common/Button';
import 'dayjs/locale/ko';
import { ATTENDANCE, getAttendacne } from '../../../constants/AttendanceType';

export const getAttendanceValueTypeForSelect = () => {
	const result = [];
	const attendanceArray = Object.values(ATTENDANCE);
	for (let i = 0; i < 3; i += 1) {
		result.push({ value: getAttendacne(attendanceArray[i]), label: getAttendacne(attendanceArray[i]) });
	}
	return result;
};

const Attendance = () => {
	const {
		handleSearch,
		onChangeDate,
		inputName,
		setInputName,
		attendanceData,
		columns,
		myClassesOption,
		handleChangeSelectedClassId,
		isUpdateModalOpen,
		handleUpdateModalCancel,
		handleUpdateModalOk,
		isUpdateModalDisabled,
		isUpdateModalLoading,
		name,
		comment,
		setComment,
		handleChangeAttendance,
		selectedDate,
	} = useAttendanceTable();

	return (
		<div>
			<div className="flex justify-between w-full my-5">
				<div>
					<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
					<DatePicker onChange={onChangeDate} className="ml-5" locale={locale} value={selectedDate} />
				</div>
				<div className="w-1/3">
					<Search
						placeholder="이름을 검색해주세요"
						allowClear
						value={inputName}
						onChange={(e) => setInputName(e.target.value)}
						maxLength={10}
						onSearch={handleSearch}
					/>
				</div>
			</div>
			<Table data={attendanceData} columns={columns} />
			<Modal
				title="출석 상태 변경"
				open={isUpdateModalOpen}
				destroyOnClose
				onOk={handleUpdateModalOk}
				onCancel={handleUpdateModalCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleUpdateModalCancel} content="취소" type="cancel" key="cancelUpdateAttendance" />,
					<Button
						handleClick={handleUpdateModalOk}
						content="변경"
						loading={isUpdateModalLoading}
						disabled={isUpdateModalDisabled}
						type="positive"
						key="updateAttendance"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="flex justify-between w-full">
						<input value={name} id="swal2-input" className="swal2-input" readOnly disabled />
						<SelectClass options={getAttendanceValueTypeForSelect()} handleChange={handleChangeAttendance} />
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
