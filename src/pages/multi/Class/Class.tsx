import { Modal } from 'antd';
import SelectClass from '../../../components/common/SelectClass';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/Table';
import { useClassModal, useClassTable } from './Class.hooks';

export const handleChange = (value: string) => {
	console.log(`selected ${value}`);
};

// TODO: 초기 진입시 본인의 반 불러와서 options에 넣어주기
export const options = [
	{ value: 'jx411', label: '롯데이커머스2기' },
	{ value: 'lucy', label: 'Lucy' },
	{ value: 'Yiminghe', label: 'yiminghe' },
];

// TODO : 백 구현후 value change

const Class = () => {
	const {
		isModalOpen,
		isDisabled,
		isLoading,
		classCode,
		name,
		setName,
		setClassCode,
		showModal,
		handleOk,
		handleCancel,
	} = useClassModal();

	const {
		columns,
		isUpdateModalOpen,
		isUpdateClassDisabled,
		isUpdateClassLoading,
		handleUpdateOk,
		handleClassUpdateCancel,
		handleChangeIsGraduated,
		classesData,
		selectedClassCode,
		setSelectedClassCode,
		selectedClassName,
		setSelectedClassName,
		graduateOptions,
	} = useClassTable();

	return (
		<div className="ml-10 w-11/12 h-full mt-10">
			<div className="flex justify-end w-full my-5">
				<Button content="클래스 추가" handleClick={showModal} key="addClass" />
			</div>
			<Table data={classesData} columns={columns} />
			<Modal
				title="클래스 추가"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="cancelAddClass" />,
					<Button
						handleClick={handleOk}
						content="확인"
						loading={isLoading}
						disabled={isDisabled}
						type="positive"
						key="addClass"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">반 이름</div>
					<input value={name} onChange={(e) => setName(e.target.value)} id="swal2-input" className="swal2-input" />
					<br />
					<br />
					<div className="swal2-label">반 코드</div>
					<input
						value={classCode as number}
						onChange={(e) => setClassCode(e.target.value as unknown as number)}
						id="swal2-input"
						className="swal2-input"
					/>
				</div>
			</Modal>
			<Modal
				title="클래스 수정"
				open={isUpdateModalOpen}
				destroyOnClose
				onOk={handleUpdateOk}
				onCancel={handleClassUpdateCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleClassUpdateCancel} content="취소" type="cancel" key="cancelUpdateClass" />,
					<Button
						handleClick={handleUpdateOk}
						content="확인"
						loading={isUpdateClassLoading}
						disabled={isUpdateClassDisabled}
						type="positive"
						key="updateClass"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">반 코드(수정 불가)</div>
					<input
						value={selectedClassCode}
						onChange={(e) => setSelectedClassCode(e.target.value)}
						id="swal2-input"
						className="swal2-input"
						readOnly
					/>
					<div className="swal2-label">반 이름</div>
					<input
						value={selectedClassName}
						onChange={(e) => setSelectedClassName(e.target.value)}
						id="swal2-input"
						className="swal2-input"
					/>
					<SelectClass options={graduateOptions} handleChange={handleChangeIsGraduated} isFull />
					<br />
					<br />
				</div>
			</Modal>
		</div>
	);
};
export default Class;
