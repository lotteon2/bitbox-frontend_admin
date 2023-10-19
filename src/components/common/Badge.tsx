import React from 'react';
import { AUTHORITY } from '../../constants/AuthorityType';

interface BadgeInterface {
	status: keyof typeof AUTHORITY;
}
const Badge: React.FC<BadgeInterface> = ({ status }) => {
	const translateAuthority = () => {
		if (status === 'ADMIN') return '관리자';
		if (status === 'MANAGER') return '매니저';
		if (status === 'TEACHER') return '강사';
		return '';
	};

	return (
		<div
			className={
				status === 'MANAGER'
					? 'w-[80px] h-[40px] text-center pt-2 bg-grayscale5 rounded-lg text-grayscale1 font-bold'
					: status === 'TEACHER'
					? 'w-[80px] h-[40px] text-center pt-2 bg-[#3056D3] rounded-lg text-grayscale1 font-bold'
					: 'w-[80px] h-[40px] text-center pt-2 bg-secondary1 rounded-lg text-grayscale1 font-bold'
			}
		>
			{translateAuthority()}
		</div>
	);
};

export default Badge;
