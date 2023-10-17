import React, { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Badge from './Badge';
import ProfileUpdater from './ProfileUpdater';
import { useUpdateProfileModal } from '../../hooks/useUpdateProfile';

export default function TopHeader() {
	const [logged, setLogged] = useState<boolean>(true);
	const { name, setName, isModalOpen, isLoading, isDisabled, showModal, handleOk, handleCancel } =
		useUpdateProfileModal();
	return (
		<div className="h-16 relative">
			<div className="right-10 top-5 flex flex-row gap-5 justify-between">
				<div>
					<div className="hamburger absolute left-10 top-10">
						<LunchDiningIcon />
					</div>
				</div>
				<div className="absolute flex gap-5 right-10 top-10">
					<Badge status="ADMIN" />
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
				</div>
			</div>
		</div>
	);
}
