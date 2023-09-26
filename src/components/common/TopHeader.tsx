import React from 'react';
import { Avatar } from 'antd';
import Badge from './Badge';

export default function TopHeader() {
	return (
		<div className="h-16 relative">
			<div className="absolute right-10 top-5 flex flex-row gap-5">
				{/* TODO: Badge props String으로 받고 있음 여기도 편한대로 수정해서 하면 될듯!! */}
				<Badge status="매니저" />
				<div className="mt-2 font-bold">이름</div>
				<Avatar
					src="https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340"
					size="large"
				/>
			</div>
		</div>
	);
}
