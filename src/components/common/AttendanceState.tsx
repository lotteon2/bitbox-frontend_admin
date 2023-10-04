interface AttendanceStateInterface {
	status: '출석' | '결석' | '지각' | '외출';
}

const AttendanceState: React.FC<AttendanceStateInterface> = ({ status }) => {
	return (
		<div
			className={
				status === '출석'
					? 'w-[60px] text-center py-1 bg-secondary2 rounded-lg text-grayscale1 font-bold'
					: status === '결석'
					? 'w-[60px] text-center py-1 bg-primary6 rounded-lg text-grayscale1 font-bold'
					: 'w-[60px] text-center py-1 bg-[#FFBE55] rounded-lg text-grayscale1 font-bold'
			}
		>
			{status}
		</div>
	);
};
export default AttendanceState;
