import { Modal } from 'antd';
import SelectClass from '../../../components/common/SelectClass';
import { useRequestTable } from './Request.hooks';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/Table';

const Request = () => {
	const {
		showModal,
		requestData,
		columns,
		handleChangeSelectedClassId,
		myClassesOption,
		isModalOpen,
		loading,
		disabled,
		handleOk,
		handleCancel,
		selectedColumnIdx,
	} = useRequestTable();

	return (
		<div>
			<div className="flex justify-start w-full my-5">
				<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
			</div>
			<Table data={requestData} columns={columns} showModal={showModal} />
			{requestData.length > 0 && (
				<Modal
					title={requestData[selectedColumnIdx].title}
					open={isModalOpen}
					destroyOnClose
					onOk={handleOk}
					onCancel={handleCancel}
					maskClosable={false}
					footer={[
						<Button handleClick={handleCancel} content="반려" type="cancel" key="cancelUpdateAttendance" />,
						<Button
							handleClick={handleOk}
							content="승인"
							loading={loading}
							disabled={disabled}
							type="positive"
							key="updateAttendance"
						/>,
					]}
				>
					<div className="my-10 flex flex-col align-center justify-center">
						<div className="flex justify-between w-full">
							{requestData[selectedColumnIdx].date} {requestData[selectedColumnIdx].name}
						</div>
						<br />
						<textarea value={requestData[selectedColumnIdx].content} id="swal2-textarea" className="swal2-textarea" />
						<br />
						<div>첨부 파일(클릭하면 다운로드)</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
export default Request;
