import { ATTENDANCE, translateAttendance } from '../../constants/AttendanceType';

interface AttendanceStateInterface {
	status: keyof typeof ATTENDANCE;
}

const AttendanceState: React.FC<AttendanceStateInterface> = ({ status }) => {
	return (
		<div
			className={
				status === 'ATTENDANCE'
					? 'w-[60px] text-center py-1 bg-secondary2 rounded-lg text-grayscale1 font-bold'
					: status === 'ABSENT'
					? 'w-[60px] text-center py-1 bg-primary6 rounded-lg text-grayscale1 font-bold'
					: 'w-[60px] text-center py-1 bg-[#FFBE55] rounded-lg text-grayscale1 font-bold'
			}
		>
			{translateAttendance(status)}
		</div>
	);
};
export default AttendanceState;
