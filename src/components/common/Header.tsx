import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PersonIcon from '@mui/icons-material/Person';
import { useUserStore } from '../../stores/user/user.store';
import { AUTHORITY } from '../../constants/AuthorityType';

export default function Header() {
	const activeStyle = {
		color: '#FF6B6B',
	};

	const memberAuthority = useUserStore((state) => state.authority);
	const [etcNav, setEtcNav] = useState<string>('/etc/attendance');
	const [multiNav, setMultiNav] = useState<string>('/multi/student');

	return (
		<ul className="sidebar w-full h-[100%] flex flex-col pl-5 pt-10 gap-10 bg-primary1 dark:bg-grayscale6 dark:text-grayscale1">
			<li>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/">
					<SpaceDashboardIcon fontSize="large" /> 대시보드
				</NavLink>
			</li>
			{memberAuthority !== AUTHORITY.TEACHER && (
				<>
					<li>
						<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to={multiNav}>
							<Diversity1Icon fontSize="large" /> 종합정보 관리
						</NavLink>
					</li>
					<li className="ml-10" onClick={() => setMultiNav('/multi/student')} role="presentation">
						<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/multi/student">
							교육생
						</NavLink>
					</li>
					<li className="ml-10" onClick={() => setMultiNav('/multi/manager')} role="presentation">
						<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/multi/manager">
							관리자
						</NavLink>
					</li>
					<li className="ml-10" onClick={() => setMultiNav('/multi/class')} role="presentation">
						<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/multi/class">
							클래스
						</NavLink>
					</li>
				</>
			)}
			<li>
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to={etcNav}>
					<PersonIcon fontSize="large" /> 기타 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/attendance')} role="presentation">
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/attendance">
					출결 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/request')} role="presentation">
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/request">
					사유서 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/score')} role="presentation">
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/score">
					성적 관리
				</NavLink>
			</li>
			<li className="ml-10" onClick={() => setEtcNav('/etc/exam')} role="presentation">
				<NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/etc/exam">
					시험 관리
				</NavLink>
			</li>
		</ul>
	);
}
