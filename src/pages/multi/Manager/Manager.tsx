import React from 'react';
import { Modal } from 'antd';
import Table from '../../../components/common/Table';
import SelectClass from '../../../components/common/SelectClass';
import Button from '../../../components/common/Button';
import { useManagerModal, useManagerTable } from './Manager.hooks';
import { handleChange } from '../Class/Class';

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
		setIsModalOpen,
		isLoading,
		isDisabled,
		showModal,
		handleOk,
		handleCancel,
	} = useManagerModal();
	const { data, columns } = useManagerTable();

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
				<Button content="관리자 추가" key="addManager" handleClick={showModal} />
			</div>
			<Table data={data} columns={columns} />
			<Modal
				title="관리자 추가"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="b1" />,
					<Button
						handleClick={handleOk}
						content="확인"
						loading={isLoading}
						disabled={isDisabled}
						type="positive"
						key="b2"
					/>,
				]}
			>
				<div className="my-10 flex flex-col justify-center">
					<div className="text-grayscale5 mb-5">*초대된 계정의 초기 비밀번호는 1111입니다.</div>
					<div className="w-full flex justify-between">
						<SelectClass options={options} handleChange={handleChange} />
						<SelectClass options={options} handleChange={handleChange} />
					</div>
					<input
						id="swal2-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="swal2-input mb-2"
						placeholder="등록할 담당자의 이메일을 입력해주세요."
					/>
					<input
						id="swal2-input"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="swal2-input"
						placeholder="등록할 담당자의 이름을 입력해주세요."
					/>
				</div>
			</Modal>
		</div>
	);
}
export default Manager;
