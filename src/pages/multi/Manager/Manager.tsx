import React from 'react';
import { Modal } from 'antd';
import Table, { DataType } from '../../../components/common/Table';
import SelectClass from '../../../components/common/SelectClass';
import Button from '../../../components/common/Button';
import { useManagerModal, useManagerTable } from './Manager.hooks';
import ProfileUpdater from '../../../components/common/ProfileUpdater';
import { useUpdateProfileModal } from '../../../hooks/useUpdateProfile';
import { AUTHORITY, getAuthority } from '../../../constants/AuthorityType';

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
		handleChangeSelectedClassIdForAdd,
	} = useManagerModal();

	const {
		admins,
		columns,
		isUpdateProfileModalOpen,
		isLoadingProfileModal,
		isDisabledProfileModal,
		handleUpdateCancel,
		handleUpdateOk,
		selectedName,
		setSelectedName,
		myClassesOption,
		handleChangeSelectedClassId,
	} = useManagerTable();

	return (
		<div>
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
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
						<SelectClass options={myClassesOption} handleChange={handleChangeSelectedClassIdForAdd} />
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
				handleOk={handleUpdateOk}
				handleCancel={handleUpdateCancel}
				selectedName={selectedName}
				setSelectedName={setSelectedName}
				changePassword
				options={getAuthorityValueTypeForSelect()}
			/>
		</div>
	);
}
export default Manager;
