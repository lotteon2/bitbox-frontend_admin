import { Modal } from 'antd';
import SelectClass from '../../../components/common/SelectClass';
import { useRequestTable } from './Request.hooks';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/Table';
import { REASON_STATEMENT } from '../../../constants/ReasonStatementType';

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
		handleChangeRequestState,
		comment,
		setComment,
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
					footer={
						requestData[selectedColumnIdx].reasonState === REASON_STATEMENT.SUBMIT && [
							<Button
								handleClick={() =>
									handleChangeRequestState(requestData[selectedColumnIdx].key, REASON_STATEMENT.REJECT)
								}
								content="반려"
								type="cancel"
								key="cancelUpdateAttendance"
							/>,
							<Button
								handleClick={() =>
									handleChangeRequestState(requestData[selectedColumnIdx].key, REASON_STATEMENT.APPROVE)
								}
								content="승인"
								loading={loading}
								disabled={disabled}
								type="positive"
								key="updateAttendance"
							/>,
						]
					}
				>
					<div className="my-10 flex flex-col align-center justify-center">
						<div className="flex justify-between w-full">
							{requestData[selectedColumnIdx].date} {requestData[selectedColumnIdx].name}
						</div>
						<br />
						<textarea
							value={requestData[selectedColumnIdx].content}
							id="swal2-textarea"
							className="swal2-textarea"
							readOnly
						/>
						<br />
						<div className="text-primary3">반려 / 승인 사유를 적어주세요.</div>
						<textarea
							value={comment}
							id="swal2-textarea"
							className="swal2-textarea"
							onChange={(e) => setComment(e.target.value)}
						/>
					</div>
				</Modal>
			)}
		</div>
	);
};
export default Request;
