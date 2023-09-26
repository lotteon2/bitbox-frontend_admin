interface TableStateChipInterface {
	title: string;
}

const TableStateChip: React.FC<TableStateChipInterface> = ({ title }) => {
	return (
		<div
			className={
				title === '반려'
					? 'w-[80px] h-[40px] text-center pt-2 bg-primary6 rounded-lg text-grayscale1 font-bold'
					: title === '승인'
					? 'w-[80px] h-[40px] text-center pt-2 bg-secondary2 rounded-lg text-grayscale1 font-bold'
					: 'w-[80px] h-[40px] text-center pt-2 bg-primary3 rounded-lg text-grayscale1 font-bold'
			}
		>
			{title}
		</div>
	);
};
export default TableStateChip;
