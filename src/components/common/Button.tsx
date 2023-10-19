import { Button as AntdBtn } from 'antd';

interface ButtonInterface {
	content: string;
	handleClick?: () => void;
	loading?: boolean;
	htmlType?: 'button' | 'submit' | 'reset' | undefined;
	type?: 'positive' | 'negative' | 'cancel';
	key: string;
	disabled?: boolean;
	isFull?: boolean;
}

const Button: React.FC<ButtonInterface> = ({
	content,
	handleClick,
	loading,
	type = 'positive',
	key,
	htmlType = 'button',
	disabled = false,
	isFull = false,
}) => {
	return (
		<AntdBtn
			disabled={disabled}
			key={key}
			htmlType={htmlType}
			onClick={handleClick}
			className={
				type === 'positive'
					? 'cursor-pointer bg-secondary1 rounded-lg text-grayscale1 font-bold text-center h-[40px] pt-2 '.concat(
							isFull ? 'w-full' : 'w-[140px]',
					  )
					: type === 'cancel'
					? 'cursor-pointer bg-grayscale5 rounded-lg text-grayscale1 font-bold text-center w-[140px] h-[40px] pt-2 '.concat(
							isFull ? 'w-full' : 'w-[140px]',
					  )
					: 'cursor-pointer bg-primary7 rounded-lg text-grayscale1 font-bold text-center w-[140px] h-[40px] pt-2 '.concat(
							isFull ? 'w-full' : 'w-[140px]',
					  )
			}
			loading={loading}
		>
			{content}
		</AntdBtn>
	);
};
export default Button;
