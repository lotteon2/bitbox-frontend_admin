import React, { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from './Badge';

export default function TopHeader() {
	const [logged, setLogged] = useState<boolean>(true);

	return (
		<div className="h-16 relative">
			<div className="absolute right-10 top-5 flex flex-row gap-5">
				{/* TODO: Badge props String으로 받고 있음 여기도 편한대로 수정해서 하면 될듯!! */}
				<Badge status="매니저" />
				<div className="mt-2 font-bold">이름</div>
				{logged ? (
					<Dropdown
						menu={{
							items: [
								{
									key: '1',
									icon: <SettingsOutlinedIcon />,
									label: <a href="/dashboard">setting</a>,
								},
								{
									key: '2',
									icon: <LogoutOutlinedIcon />,
									label: <a href="/logout">logout</a>,
								},
							],
						}}
					>
						<Avatar
							src="https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340"
							size="large"
						/>
					</Dropdown>
				) : (
					<a style={{ cursor: 'pointer' }} href="/login">
						login
					</a>
				)}
				{/* <Avatar
					src="https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340"
					size="large"
				/> */}
			</div>
		</div>
	);
}
