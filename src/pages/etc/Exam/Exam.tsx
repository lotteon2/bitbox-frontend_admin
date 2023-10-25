import { Modal } from 'antd';
import { useExamModal, useExamTable } from './Exam.Hooks';
import Table from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import SelectClass from '../../../components/common/SelectClass';

const Exam = () => {
	const {
		columns,
		isModalOpen: isExamUpdateModalOpen,
		isDisabled: isExamUpdateDisabled,
		isLoading: isExamUpdateLoading,
		handleOk: handleExamUpdateOk,
		handleCancel: handleExamUpdateCancel,
		examsData,
		updateName,
		setUpdateName,
		updatePerfectScore,
		setUpdatePerfectScore,
		selectedClassName,
		handleChangeSelectedClassId,
		myClassesOption,
	} = useExamTable();

	const {
		isModalOpen,
		isDisabled,
		isLoading,
		perfectScore,
		setPerfectScore,
		name,
		setName,
		showModal,
		handleOk,
		handleCancel,
	} = useExamModal();

	return (
		<>
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
				<Button content="시험 추가" handleClick={showModal} key="addExam" />
			</div>
			<Table data={examsData} columns={columns} />
			<Modal
				title="시험 추가"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="cancelAddExam" />,
					<Button
						handleClick={handleOk}
						content="확인"
						loading={isLoading}
						disabled={isDisabled}
						type="positive"
						key="addExam"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">시험 이름</div>
					<input value={name} onChange={(e) => setName(e.target.value)} id="swal2-input" className="swal2-input" />
					<br />
					<br />
					<div className="swal2-label">만점</div>
					<input
						value={perfectScore as number}
						onChange={(e) => setPerfectScore(e.target.value as unknown as number)}
						id="swal2-input"
						className="swal2-input"
					/>
				</div>
			</Modal>
			<Modal
				title="시험 수정"
				open={isExamUpdateModalOpen}
				destroyOnClose
				onOk={handleExamUpdateOk}
				onCancel={handleExamUpdateCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleExamUpdateCancel} content="취소" type="cancel" key="cancelUpdateClass" />,
					<Button
						handleClick={handleExamUpdateOk}
						content="확인"
						loading={isExamUpdateLoading}
						disabled={isExamUpdateDisabled}
						type="positive"
						key="updateClass"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">반 이름 (수정 불가)</div>
					<input value={selectedClassName} readOnly id="swal2-input" className="swal2-input" />
					<div className="swal2-label">시험 이름</div>
					<input
						value={updateName}
						onChange={(e) => setUpdateName(e.target.value)}
						id="swal2-input"
						className="swal2-input"
					/>
					<div className="swal2-label">만점</div>
					<input
						value={updatePerfectScore}
						onChange={(e) => setUpdatePerfectScore(e.target.value as unknown as number)}
						id="swal2-input"
						className="swal2-input"
					/>
					{/* <SelectClass options={graduateOptions} handleChange={setIsGradudate} /> */}
					<br />
					<br />
				</div>
			</Modal>
		</>
	);
};
export default Exam;
