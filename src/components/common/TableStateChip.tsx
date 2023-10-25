import { REASON_STATEMENT, translateReasonStatement } from '../../constants/ReasonStatementType';

interface TableStateChipInterface {
	title: keyof typeof REASON_STATEMENT;
	handleClick?: () => void;
}

const TableStateChip: React.FC<TableStateChipInterface> = ({ title, handleClick }) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={
				title === REASON_STATEMENT.REJECT
					? 'w-[80px] h-[40px] text-center bg-primary6 rounded-lg text-grayscale1 font-bold'
					: title === REASON_STATEMENT.APPROVE
					? 'w-[80px] h-[40px] text-center bg-secondary2 rounded-lg text-grayscale1 font-bold'
					: 'w-[80px] h-[40px] text-center bg-primary3 rounded-lg text-grayscale1 font-bold cursor-pointer'
			}
		>
			{translateReasonStatement(title)}
		</button>
	);
};
export default TableStateChip;
