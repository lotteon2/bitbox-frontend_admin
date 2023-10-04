interface ButtonInterface {
	content: string;
}

const Button: React.FC<ButtonInterface> = ({ content }) => {
	return (
		<div className="cursor-pointer bg-secondary1 rounded-lg text-grayscale1 font-bold text-center w-[140px] h-[40px] pt-2">
			{content}
		</div>
	);
};
export default Button;
