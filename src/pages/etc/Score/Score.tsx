import { ColumnsType } from 'antd/es/table';
import { Avatar, Modal } from 'antd';
import { HotTable, HotColumn } from '@handsontable/react';
import { useNavigate } from 'react-router-dom';
import BarChart from '../../../components/DashBoard/BarChart';
import Button from '../../../components/common/Button';
import SelectClass from '../../../components/common/SelectClass';
import Table, { DataType } from '../../../components/common/Table';
import TableStateChip from '../../../components/common/TableStateChip';
import { useChangeScoreModal, useScoreTable } from './Score.hooks';
import 'handsontable/dist/handsontable.min.css';
import 'pikaday/css/pikaday.css';

const Score = () => {
	const navigate = useNavigate();
	const {
		scoreData,
		examsOption,
		columns,
		myClassesOption,
		handleChangeSelectedClassId,
		showUpdateModal,
		handleUpdateCancel,
		handleUpdateOk,
		isUpdateModalOpen,
		isUpdateDisabled,
		isUpdateLoading,
		handleChangeSelectedExamId,
	} = useScoreTable();

	console.log('examsOption', examsOption);

	return (
		<div>
			<div className="flex justify-between w-full my-5">
				<div className="flex gap-5">
					<SelectClass handleChange={handleChangeSelectedClassId} options={myClassesOption} />
					{examsOption.length > 0 && <SelectClass handleChange={handleChangeSelectedExamId} options={examsOption} />}
				</div>
			</div>
			<div>
				{examsOption.length <= 0 ? (
					<div className="w-full flex flex-col justify-center h-full text-left gap-5 text-lg">
						<div>해당 반에 등록된 시험이 없어요. </div>
						<div> 시험을 먼저 등록해주세요.</div>
						<Button
							content="시험 등록하러 가기"
							key="addExamBtn"
							handleClick={() => navigate('/etc/exam')}
							type="negative"
						/>
					</div>
				) : (
					<Table data={scoreData} columns={columns} showModal={showUpdateModal} />
				)}
			</div>
			{scoreData.length > 0 && (
				<Modal
					title="성적 변경"
					open={isUpdateModalOpen}
					destroyOnClose
					onOk={handleUpdateOk}
					onCancel={handleUpdateCancel}
					maskClosable={false}
					footer={[
						<Button handleClick={handleUpdateCancel} content="취소" type="cancel" key="cancelChangeScore" />,
						<Button
							handleClick={handleUpdateOk}
							content="확인"
							loading={isUpdateLoading}
							disabled={isUpdateDisabled}
							type="positive"
							key="ChangeScore"
						/>,
					]}
				>
					<div className="my-10 flex flex-col align-center justify-center">
						<div className="swal2-label">교육생</div>
						{/* <input defaultValue={name} id="swal2-input" className="swal2-input" readOnly disabled />
					<div className="swal2-label">시험명</div>
					<input defaultValue={exam} id="swal2-input" className="swal2-input" readOnly disabled />
					<input
						value={score}
						onChange={(e) => setScore(e.target.value as unknown as number)}
						id="swal2-input"
						className="swal2-input"
					/> */}
						<br />
						<br />
					</div>
				</Modal>
			)}

			{/* <Modal
				title="성적 등록"
				open={isAddScoreModalOpen}
				destroyOnClose
				onOk={handleAddScoreOk}
				onCancel={handleAddScoreCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleAddScoreCancel} content="취소" type="cancel" key="cancelScore" />,
					<Button
						handleClick={handleAddScoreOk}
						content="확인"
						loading={isAddScoreLoading}
						disabled={isAddScoreModalDisabled}
						type="positive"
						key="addScore"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">시험명</div>
					<input
						value={examName}
						onChange={(e) => setExamName(e.target.value)}
						id="swal2-input"
						className="swal2-input"
					/>
					<div className="swal2-label">만점</div>
					<input
						value={perfectScore}
						onChange={(e) => setPerfectScore(e.target.value)}
						id="swal2-input"
						className="swal2-input"
					/>
					<div className="my-10 flex flex-col align-center justify-center">
						<HotTable
							data={TableData}
							height={450}
							colWidths={[180, 180]}
							colHeaders={['교육생', '점수']}
							dropdownMenu
							contextMenu
							filters
							rowHeaders
							beforeRenderer={addClassesToRows}
							correctFormat
							licenseKey="non-commercial-and-evaluation"
						>
							<HotColumn data={0} readOnly className="htCenter" />
							<HotColumn data={1} type="numeric" className="htCenter" />
						</HotTable>
					</div>
				</div>
			</Modal> */}
		</div>
	);
};
export default Score;
