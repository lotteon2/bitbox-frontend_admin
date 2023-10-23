import { Modal } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Table from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import SelectClass from '../../../components/common/SelectClass';
import { useStudentModal, useInvitedStudent } from './Student.hooks';

function Student() {
	const {
		email,
		setEmail,
		isModalOpen,
		invitedEmails,
		handleClickAddBtn,
		setIsModalOpen,
		loading,
		setLoading,
		showModal,
		handleOk,
		handleCancel,
		myClassesOption,
		handleChangeSelectedClassId,
		studentColumns,
		studentsData,
	} = useStudentModal();

	const { invitedStudentColumns, invitedStudents } = useInvitedStudent();

	return (
		<div className="ml-10 w-11/12 h-full mt-10">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
				<Button content="교육생 추가" key="addStudent" handleClick={showModal} />
			</div>
			<div className="flex justify-between w-full my-5 gap-10">
				<Table data={studentsData} columns={studentColumns} tableName="반별 학생" />
				<Table data={invitedStudents} columns={invitedStudentColumns} tableName="초대된 명단" />
			</div>
			<Modal
				title="교육생 추가"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[<Button handleClick={handleOk} content="닫기" loading={loading} type="positive" key="b2" />]}
			>
				<div className="my-10 flex flex-col justify-center">
					<div className="text-grayscale5 mb-5">*반드시 카카오 로그인이 가능한 계정으로 초대해주세요.</div>
					<SelectClass options={myClassesOption} handleChange={handleChangeSelectedClassId} isReadOnly isFull />
					<div className="w-full flex justify-between items-center">
						<input
							id="swal2-input"
							className="swal2-input w-full"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button type="button" onClick={handleClickAddBtn}>
							<AddOutlinedIcon className="ml-5 cursor-pointer grow-0" />
						</button>
					</div>
					<br />
					<br />
					<div className="swal2-label">초대된 명단</div>
					<div className="swal2-div">
						<ul>
							{invitedEmails.map((invitedEmail: string) => (
								<li key={invitedEmail}>{invitedEmail}</li>
							))}
						</ul>
					</div>
				</div>
			</Modal>
		</div>
	);
}
export default Student;
