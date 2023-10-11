import React, { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from './Badge';
import ProfileUpdater from './ProfileUpdater';
import { useManagerModal } from '../../pages/multi/Manager/Manager.hooks';
import { useUpdateProfileModal } from '../../hooks/UpdateProfile';

export default function TopHeader() {
	const [logged, setLogged] = useState<boolean>(true);
	const { name, setName, isModalOpen, isLoading, isDisabled, showModal, handleOk, handleCancel } =
		useUpdateProfileModal();
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
									label: (
										<button type="button" onClick={showModal}>
											<SettingsOutlinedIcon className="mr-2" />
											설정
										</button>
									),
								},
								{
									key: '2',
									label: (
										<button type="button" onClick={showModal}>
											<LogoutOutlinedIcon className="mr-2" />
											로그아웃
										</button>
									),
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
				<ProfileUpdater
					isModalOpen={isModalOpen}
					isLoading={isLoading}
					isDisabled={isDisabled}
					name={name}
					setName={setName}
					handleOk={handleOk}
					handleCancel={handleCancel}
					changePassword
				/>
				{/* <Avatar
					src="https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340"
					size="large"
				/> */}
			</div>
		</div>
	);
}
