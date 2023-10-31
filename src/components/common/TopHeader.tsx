import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { AxiosError } from 'axios';
import Badge from './Badge';
import ProfileUpdater from './ProfileUpdater';
import { useUpdateProfileModal } from '../../hooks/useUpdateProfile';
import { useUserStore } from '../../stores/user/user.store';
import { usePatchMyInfoMutation } from '../../mutations/usePatchMyInfoMutation';
import { Toast } from './Toast';
import { useGetMyAdimInfoQuery } from '../../queries/useGetMyAdminInfoQuery';

const TopHeader = () => {
	const navigate = useNavigate();
	const [name, authority, profileImg, isLogin, dispatchIsLogin] = useUserStore((state) => [
		state.name,
		state.authority,
		state.profileImg,
		state.isLogin,
		state.dispatchIsLogin,
	]);
	const [selectedName, setSelectedName] = useState<string>(name || '');
	const [selectedProfileImg, setSelectedProfileImg] = useState<string>(profileImg || '');

	const { isModalOpen, setIsModalOpen, showModal, isLoading, setIsLoading, isDisabled, setIsDisabled, handleCancel } =
		useUpdateProfileModal();

	const { mutateAsync } = usePatchMyInfoMutation();
	const { refetch } = useGetMyAdimInfoQuery();

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		navigate('/login');
		dispatchIsLogin(false);
	};

	const handleOk = async () => {
		console.log('ok');
		setIsLoading(true);
		await mutateAsync({
			adminProfileImg: selectedProfileImg,
			adminName: selectedName,
		})
			.then((res) => {
				Toast(true, '정보가 수정되었어요');
				setIsModalOpen(false);
				refetch();
			})
			.catch((err: AxiosError) => {
				Toast(false, '정보 수정에 실패했어요.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		console.log(name, selectedName, profileImg, selectedProfileImg);
		if (name !== selectedName || (profileImg !== null && profileImg !== selectedProfileImg)) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [selectedName, selectedProfileImg]);

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
					<Dropdown
						menu={{
							items: [
								{
									key: 'setMyInfo',
									label: (
										<button type="button" onClick={showModal}>
											<SettingsOutlinedIcon className="mr-2" />
											설정
										</button>
									),
								},
								{
									key: 'setLogout',
									label: (
										<button type="button" onClick={handleLogout}>
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
					<ProfileUpdater
						isModalOpen={isModalOpen}
						isLoading={isLoading}
						isDisabled={isDisabled}
						selectedName={selectedName}
						setSelectedName={setSelectedName}
						handleOk={handleOk}
						handleCancel={handleCancel}
						changePassword
						imageUrl={selectedProfileImg}
						setImageUrl={setSelectedProfileImg}
					/>
				</div>
			</div>
		</div>
	);
};
export default React.memo(TopHeader);
