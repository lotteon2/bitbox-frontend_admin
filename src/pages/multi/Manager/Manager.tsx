import React from 'react';
import { Modal } from 'antd';
import Table, { DataType } from '../../../components/common/Table';
import SelectClass from '../../../components/common/SelectClass';
import Button from '../../../components/common/Button';
import { useManagerModal, useManagerTable } from './Manager.hooks';
import { handleChange } from '../Class/Class';
import ProfileUpdater from '../../../components/common/ProfileUpdater';
import { useUpdateProfileModal } from '../../../hooks/useUpdateProfile';
import { AUTHORITY, getAuthority } from '../../../constants/AuthorityType';
import { GetAdminInfoResponseData } from '../../../apis/admin/adminAPIService.types';

export const getAuthorityValueTypeForSelect = () => {
	const result = [];
	const authorityArray = Object.values(AUTHORITY);
	for (let i = 0; i < 3; i += 1) {
		result.push({ value: getAuthority(authorityArray[i]), label: getAuthority(authorityArray[i]) });
	}
	return result;
};

function Manager() {
	const [filteredInfo, setFilterInfo] = React.useState<string>();

	// TODO: 초기 진입시 본인의 반 불러와서 options에 넣어주기
	const options = [
		{ value: 'jx411', label: '롯데이커머스2기' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
	];

	const {
		email,
		setEmail,
		name,
		setName,
		isModalOpen,
		isLoading,
		isDisabled,
		showModal,
		handleOk,
		handleCancel,
		handleChangeAuthority: handleChangeAuthorityForAdd,
	} = useManagerModal();

	const {
		name: updateName,
		setName: setUpdateName,
		isModalOpen: isUpdateProfileModalOpen,
		isLoading: isLoadingProfileModal,
		isDisabled: isDisabledProfileModal,
		showModal: showUpdateModal,
		handleOk: handleUpdateOk,
		handleCancel: handleUpdateCancel,
	} = useUpdateProfileModal();

	const { admins, columns, handleChangeAuthority, data } = useManagerTable(showUpdateModal);

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
				<Button content="관리자 추가" key="addManager" handleClick={showModal} />
			</div>
			<Table data={admins} columns={columns} />
			<Modal
				title="관리자 추가"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="cancleAddManager" />,
					<Button
						handleClick={handleOk}
						content="확인"
						loading={isLoading}
						disabled={isDisabled}
						type="positive"
						key="addManager"
					/>,
				]}
			>
				<div className="my-10 flex flex-col justify-center">
					<div className="text-grayscale5 mb-5">*초대된 계정의 초기 비밀번호는 1111입니다.</div>
					<div className="w-full flex justify-between">
						<SelectClass options={options} handleChange={handleChange} />
						<SelectClass options={getAuthorityValueTypeForSelect()} handleChange={handleChangeAuthorityForAdd} />
					</div>
					<input
						id="swal2-input"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="swal2-input"
						placeholder="등록할 담당자의 이름을 입력해주세요."
					/>
					<input
						id="swal2-input"
						value={email}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						className="swal2-input mb-2"
						placeholder="등록할 담당자의 이메일을 입력해주세요."
					/>
				</div>
			</Modal>
			<ProfileUpdater
				isModalOpen={isUpdateProfileModalOpen}
				isLoading={isLoadingProfileModal}
				isDisabled={isDisabledProfileModal}
				name={updateName}
				setName={setUpdateName}
				handleOk={handleUpdateOk}
				handleCancel={handleUpdateCancel}
				changePassword
				handleChangeAuthority={handleChangeAuthority}
				options={getAuthorityValueTypeForSelect()}
			/>
		</div>
	);
}
export default Manager;
