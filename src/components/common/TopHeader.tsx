import React, { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Badge from './Badge';
import ProfileUpdater from './ProfileUpdater';
import { useUpdateProfileModal } from '../../hooks/useUpdateProfile';
import { useUserStore } from '../../stores/user/user.store';

export default function TopHeader() {
	const [logged, setLogged] = useState<boolean>(true);
	const [name, authority, profileImg] = useUserStore((state) => [state.name, state.authority, state.profileImg]);

	// const { name, setName, isModalOpen, isLoading, isDisabled, showModal, handleOk, handleCancel } =
	// 	useUpdateProfileModal();
	return (
		<div className="h-16 relative">
			<div className="right-10 top-5 flex flex-row gap-5 justify-between">
				<div>
					<div className="hamburger absolute left-10 top-10">
						<LunchDiningIcon />
					</div>
				</div>
				<div className="absolute flex gap-5 right-10 top-10">
					<Badge status={authority} />
					<div className="mt-2 font-bold">{name}</div>
					{logged ? (
						<Dropdown
							menu={{
								items: [
									{
										key: '1',
										label: (
											<button type="button" onClick={() => console.log('수정')}>
												<SettingsOutlinedIcon className="mr-2" />
												설정
											</button>
										),
									},
									{
										key: '2',
										label: (
											<button type="button" onClick={() => console.log('logout')}>
												<LogoutOutlinedIcon className="mr-2" />
												로그아웃
											</button>
										),
									},
								],
							}}
						>
							<Avatar src={profileImg} size="large" />
						</Dropdown>
					) : (
						<a style={{ cursor: 'pointer' }} href="/login">
							login
						</a>
					)}
					{/* <ProfileUpdater
						isModalOpen={isModalOpen}
						isLoading={isLoading}
						isDisabled={isDisabled}
						handleOk={handleOk}
						handleCancel={handleCancel}
						changePassword
					/> */}
				</div>
			</div>
		</div>
	);
}
