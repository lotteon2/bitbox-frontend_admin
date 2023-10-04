import React from 'react';

interface BadgeInterface {
	status: '매니저' | '강사' | '관리자';
}
const Badge: React.FC<BadgeInterface> = ({ status }) => {
	return (
		<div
			className={
				status === '매니저'
					? 'w-[80px] h-[40px] text-center pt-2 bg-grayscale5 rounded-lg text-grayscale1 font-bold'
					: status === '강사'
					? 'w-[80px] h-[40px] text-center pt-2 bg-[#3056D3] rounded-lg text-grayscale1 font-bold'
					: 'w-[80px] h-[40px] text-center pt-2 bg-secondary1 rounded-lg text-grayscale1 font-bold'
			}
		>
			{status}
		</div>
	);
};

export default Badge;
