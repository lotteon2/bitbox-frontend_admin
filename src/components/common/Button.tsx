import { Button as AntdBtn } from 'antd';

interface ButtonInterface {
	content: string;
	handleClick?: () => void;
	loading?: boolean;
	type?: 'positive' | 'negative' | 'cancel';
	key: string;
}

const Button: React.FC<ButtonInterface> = ({ content, handleClick, loading, type = 'positive', key }) => {
	return (
		<AntdBtn
			key={key}
			onClick={handleClick}
			className={
				type === 'positive'
					? 'cursor-pointer bg-secondary1 rounded-lg text-grayscale1 font-bold text-center w-[140px] h-[40px] pt-2'
					: type === 'cancel'
					? 'cursor-pointer bg-grayscale5 rounded-lg text-grayscale1 font-bold text-center w-[140px] h-[40px] pt-2'
					: 'cursor-pointer bg-primary7 rounded-lg text-grayscale1 font-bold text-center w-[140px] h-[40px] pt-2'
			}
			loading={loading}
		>
			{content}
		</AntdBtn>
	);
};
export default Button;
