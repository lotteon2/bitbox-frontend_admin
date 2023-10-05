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

function Class() {
	const { handleDelete, data, columns } = useClassTable();
	const { isModalOpen, setIsModalOpen, loading, setLoading, showModal, handleOk, handleCancel } = useClassModal();

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5">
				<SelectClass handleChange={handleChange} options={options} />
				<Button content="클래스 추가" handleClick={showModal} key="addClass" />
			</div>
			<Table data={data} columns={columns} />
			<Modal
				title="클래스 추가"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="b1" />,
					<Button handleClick={handleOk} content="확인" loading={loading} type="positive" key="b2" />,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">반 이름</div>
					<input id="swal2-input" className="swal2-input" />
					<br />
					<br />
					<div className="swal2-label">반 코드</div>
					<input id="swal2-input" className="swal2-input" />
				</div>
			</Modal>
		</div>
	);
}
export default Class;
