import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import ClearIcon from '@mui/icons-material/Clear';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PersonIcon from '@mui/icons-material/Person';
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
import { useHamburgerStore } from '../../stores/hamburger/hamburgerStore';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const TopHeader = () => {
	const navigate = useNavigate();
	const [name, authority, profileImg, isLogin, dispatchIsLogin] = useUserStore((state) => [
		state.name,
		state.authority,
		state.profileImg,
		state.isLogin,
		state.dispatchIsLogin,
	]);
	const [isHamburgerClicked, setIsHamburgerClicked] = useHamburgerStore((state) => [
		state.isHamburgerClicked,
		state.dispatchIsHamburgerClicked,
	]);
	const [current, setCurrent] = useState('1');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};
	const [selectedName, setSelectedName] = useState<string>(name || '');
	const [selectedProfileImg, setSelectedProfileImg] = useState<string>(profileImg || '');
	const { isModalOpen, setIsModalOpen, showModal, isLoading, setIsLoading, isDisabled, setIsDisabled, handleCancel } =
		useUpdateProfileModal();

	const { mutateAsync } = usePatchMyInfoMutation();
	const { refetch } = useGetMyAdimInfoQuery();

	const handleClick = () => {
		setIsHamburgerClicked(!isHamburgerClicked);
	};

	const items: MenuItem[] = [
		getItem(
			<div className="float-right">
				<ClearIcon onClick={handleClick} />
			</div>,
			'10',
		),
		getItem(
			<div className="flex align-center">
				<NavLink onClick={handleClick} to="/">
					대시보드
				</NavLink>
			</div>,
			'1',
			<SpaceDashboardIcon />,
		),
		getItem('종합정보 관리', '2', <Diversity1Icon />, [
			getItem(
				<NavLink onClick={handleClick} to="/multi/student">
					교육생
				</NavLink>,
				'3',
			),
			getItem(
				<NavLink onClick={handleClick} to="/multi/manager">
					관리자
				</NavLink>,
				'4',
			),
			getItem(
				<NavLink onClick={handleClick} to="/multi/class">
					클래스
				</NavLink>,
				'5',
			),
		]),
		getItem('기타관리', '6', <PersonIcon />, [
			getItem(
				<NavLink onClick={handleClick} to="/etc/attendance">
					출결관리
				</NavLink>,
				'7',
			),
			getItem(
				<NavLink onClick={handleClick} to="/etc/request">
					사유서관리
				</NavLink>,
				'8',
			),
			getItem(
				<NavLink onClick={handleClick} to="/etc/score">
					성적관리
				</NavLink>,
				'9',
			),
			getItem(
				<NavLink onClick={handleClick} to="/etc/exam">
					시험관리
				</NavLink>,
				'10',
			),
		]),
	];

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

	useEffect(() => {
		console.log('isHamburger', isHamburgerClicked);
	}, [isHamburgerClicked]);

	return (
		<div className="h-16 relative">
			<div className="right-10 top-5 flex align-center flex-row gap-5 justify-between">
				<div
					className="hamburger absolute left-10 top-10 cursor-pointer h-[40px] flex align-center"
					onClick={handleClick}
					role="presentation"
				>
					<LunchDiningIcon />
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
				{isHamburgerClicked && (
					<Menu
						onClick={onClick}
						style={{ width: '100%', zIndex: 10 }}
						selectedKeys={[current]}
						mode="inline"
						items={items}
					/>
				)}
			</div>
		</div>
	);
};
export default React.memo(TopHeader);
