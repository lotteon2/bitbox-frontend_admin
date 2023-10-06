interface TableStateChipInterface {
	title: string;
	handleClick?: () => void;
}

const TableStateChip: React.FC<TableStateChipInterface> = ({ title, handleClick }) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={
				title === '반려'
					? 'w-[80px] h-[40px] text-center bg-primary6 rounded-lg text-grayscale1 font-bold'
					: title === '승인'
					? 'w-[80px] h-[40px] text-center bg-secondary2 rounded-lg text-grayscale1 font-bold'
					: 'w-[80px] h-[40px] text-center bg-primary3 rounded-lg text-grayscale1 font-bold cursor-pointer'
			}
		>
			{title}
		</button>
	);
};
export default TableStateChip;
