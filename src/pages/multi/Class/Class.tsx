import { Modal } from 'antd';
import SelectClass from '../../../components/common/SelectClass';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/Table';
import { useClassModal, useClassTable, useClassUpdateModal } from './Class.hooks';

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
const graduateOptions = [
	{ value: 'isNotGraduate', label: '교육' },
	{ value: 'isGraduate', label: '수료' },
];
const Class = () => {
	const {
		columns,
		isModalOpen: isClassUpdateModalOpen,
		isDisabled: isClassUpdateDisabled,
		isLoading: isClassUpdateLoading,
		handleOk: handleClassUpdateOk,
		handleCancel: handleClassUpdateCancel,
		isGraduate,
		setIsGradudate,
		classesData,
	} = useClassTable();
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

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
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
						value={classCode}
						onChange={(e) => setClassCode(e.target.value as unknown as number)}
						id="swal2-input"
						className="swal2-input"
					/>
				</div>
			</Modal>
			<Modal
				title="클래스 수정"
				open={isClassUpdateModalOpen}
				destroyOnClose
				onOk={handleClassUpdateOk}
				onCancel={handleClassUpdateCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleClassUpdateCancel} content="취소" type="cancel" key="cancelUpdateClass" />,
					<Button
						handleClick={handleOk}
						content="확인"
						loading={isClassUpdateLoading}
						disabled={isClassUpdateDisabled}
						type="positive"
						key="updateClass"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">반 코드</div>
					<input
						value={classCode}
						onChange={(e) => setClassCode(e.target.value as unknown as number)}
						id="swal2-input"
						className="swal2-input"
						readOnly
					/>
					<div className="swal2-label">반 이름</div>
					<input value={name} onChange={(e) => setName(e.target.value)} id="swal2-input" className="swal2-input" />
					<SelectClass options={graduateOptions} handleChange={setIsGradudate} />
					<br />
					<br />
				</div>
			</Modal>
		</div>
	);
};
export default Class;
