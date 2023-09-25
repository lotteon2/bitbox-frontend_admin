import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PersonIcon from '@mui/icons-material/Person';
import HeadphonesIcon from '@mui/icons-material/Headphones';

export default function Header() {
	const activeStyle = {
		color: '#FF6B6B',
	};

	const [etcNav, setEtcNav] = useState<string>('/etc/attendance');
	const [multiNav, setMultiNav] = useState<string>('/multi/student');
	/** TODO: 경로 임의로 넣어놔서 나중에 편한대로 수정하면 됨!!
	 *  1. NavLink의 to 부분 경로 수정
	 *  2. 교육생 관리 하위의 onClick set() 경로 수정
	 *  3. routes -> intex.tsx의 경로 수정 및 컴포넌트 생성 & 연결
	 */
	return (
		<ul className="w-full h-[100%] flex flex-col pl-5 pt-10 gap-10 bg-primary1 dark:bg-grayscale6 dark:text-grayscale1">
			<li>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/">
					<SpaceDashboardIcon fontSize="large" /> 대시보드
				</NavLink>
			</li>
			<li>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to={multiNav}>
					<Diversity1Icon fontSize="large" /> 종합정보 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/multi/student')}>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/multi/student">
					교육생
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/multi/manager')}>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/multi/manager">
					관리자
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/multi/class')}>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/multi/class">
					클래스
				</NavLink>
			</li>
			<li>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to={etcNav}>
					<PersonIcon fontSize="large" /> 기타 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/attendance')}>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/attendance">
					출결 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/request')}>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/request">
					사유서 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/score')}>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/score">
					성적 관리
				</NavLink>
			</li>
		</ul>
	);
}
