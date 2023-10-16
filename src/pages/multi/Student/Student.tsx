import { ColumnsType } from 'antd/es/table';
import { Avatar, Dropdown, Modal } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Table, { DataType } from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import { Toast } from '../../../components/common/Toast';
import SelectClass from '../../../components/common/SelectClass';
import { handleChange, options } from '../Class/Class';
import { Alert } from '../../../components/common/Alert';
import { useStudentModal } from './Student.hooks';

const handleDelete = (id: number) => {
	console.log('hi');
	Alert('교육생 정보를 삭제하시겠습니까?', '삭제하시면 되돌릴 수 없습니다').then((result) => {
		// 만약 Promise리턴을 받으면,
		if (result.isConfirmed) {
			// 모달창에서 confirm 버튼을 눌렀다면
			Toast(true, '교육생 정보가 삭제되었습니다.');
		} else {
			// 모달창에서 cancel 버튼을 눌렀다면
		}
	});
};
const columns: ColumnsType<DataType> = [
	{
		title: '',
		dataIndex: 'imageSrc',
		key: 'imageSrc',
		render: (text) => <Avatar src={text} size="large" />,
		width: '100px',
	},
	{
		title: '이름',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a href="/dashboard">{text}</a>,
		align: 'center',
	},
	{
		title: '이메일',
		dataIndex: 'email',
		key: 'email',
		render: (text) => <a href="/dashboard">{text}</a>,
		align: 'center',
	},
	{
		title: '반',
		dataIndex: 'class',
		key: 'class',
		align: 'center',
	},
	{
		title: '',
		dataIndex: 'state',
		key: 'state',
		width: '30px',
		align: 'right',
		render: (text) => (
			<Dropdown
				className="cursor-pointer"
				menu={{
					items: [
						{
							key: 'd1',
							label: (
								<a href="/dashboard">
									<SettingsOutlinedIcon className="mr-2" />
									수정
								</a>
							),
						},
						{
							key: 'd2',
							label: (
								<button type="button" onClick={() => handleDelete(1)}>
									<DeleteOutlineOutlinedIcon className="mr-2" />
									삭제
								</button>
							),
						},
					],
				}}
			>
				<MoreVertOutlinedIcon />
			</Dropdown>
		),
	},
];

export const data: DataType[] = [
	{
		key: 1,
		name: '김명준',
		class: '롯데e커머스 2기',
		email: 'abc@naver.com',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: 2,
		name: '안광현',
		class: '롯데e커머스 1기',
		email: 'hi123@naver.com',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: 3,
		name: '마덤보',
		class: '롯데e커머스 2기',
		email: 'hello@daum.com',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
	{
		key: 4,
		name: '강사3',
		email: 'hello@daum.com',
		class: '코엑스 3기',
		state: '변경',
		imageSrc: 'https://github.com/Hyevvy/lotbook/assets/72402747/21bea927-f307-4b82-879e-83668bb9f340',
	},
];

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
	} = useStudentModal();

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
				<Button content="교육생 추가" key="addStudent" handleClick={showModal} />
			</div>
			<Table data={data} columns={columns} />
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
					<SelectClass options={options} handleChange={handleChange} />
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
							{invitedEmails.map((invitedEmail) => (
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
