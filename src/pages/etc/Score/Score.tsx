import { ColumnsType } from 'antd/es/table';
import { Avatar, Modal } from 'antd';
import { HotTable, HotColumn } from '@handsontable/react';
import BarChart from '../../../components/DashBoard/BarChart';
import Button from '../../../components/common/Button';
import SelectClass from '../../../components/common/SelectClass';
import Table, { DataType } from '../../../components/common/Table';
import { handleChange, options } from '../../multi/Class/Class';
import TableStateChip from '../../../components/common/TableStateChip';
import { useAddExamModal, useAddScoreModal, useChangeScoreModal } from './Score.hooks';
import { TableData } from '../../../constants/TableConstants';
import { addClassesToRows } from '../../../hooks/TableHooks';
import 'handsontable/dist/handsontable.min.css';
import 'pikaday/css/pikaday.css';

const Score = () => {
	const { name, exam, isModalOpen, isDisabled, isLoading, score, setScore, showModal, handleOk, handleCancel } =
		useChangeScoreModal();

	const {
		examName,
		setExamName,
		perfectScore,
		setPerfectScore,
		isModalOpen: isAddExamModalOpen,
		isDisabled: isAddExamModalDisabled,
		isLoading: isAddExamLoading,
		showModal: showAddExamModal,
		handleOk: handleAddExamOk,
		handleCancel: handleAddExamCancel,
	} = useAddExamModal();

	const {
		// examName,
		// setExamName,
		// perfectScore,
		// setPerfectScore,
		isModalOpen: isAddScoreModalOpen,
		isDisabled: isAddScoreModalDisabled,
		isLoading: isAddScoreLoading,
		showModal: showAddScoreModal,
		handleOk: handleAddScoreOk,
		handleCancel: handleAddScoreCancel,
	} = useAddScoreModal();

	const chartData = [
		{
			name: 'HTML',
			num: 5,
		},
		{
			name: 'JAVA',
			num: 3,
		},
		{
			name: 'Spring',
			num: 1,
		},
		{
			name: 'React',
			num: 2,
		},
		{
			name: 'Jquery',
			num: 4,
		},
		{
			name: 'Vue',
			num: 2,
		},
	];

	const data: DataType[] = [
		{
			key: 1,
			name: '김명준',
			imageSrc: '',
			exam: 'HTML',
			score: '90/100',
			state: '변경',
		},
		{
			key: 2,
			name: '김명준',
			imageSrc: '',
			exam: 'HTML',
			score: '90/100',
			state: '변경',
		},
		{
			key: 3,
			name: '김명준',
			imageSrc: '',
			exam: 'HTML',
			score: '90/100',
			state: '변경',
		},
	];

	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'imageSrc',
			key: 'imageSrc',
			render: (text) => <Avatar src={text} size="large" />,
			align: 'center',
		},
		{
			title: '교육생',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: '시험명',
			dataIndex: 'exam',
			key: 'exam',
			align: 'center',
		},
		{
			title: '성적',
			dataIndex: 'score',
			key: 'score',
			align: 'center',
		},
		{
			title: '',
			dataIndex: 'state',
			key: 'state',
			render: (text: string, a, id) => (
				<TableStateChip
					title={text}
					handleClick={() => showModal(data[id].name || '', data[id].score || '', data[id].exam || '')}
				/>
			),
		},
	];

	return (
		<div className="ml-10 w-11/12 h-full">
			<div className="flex justify-between w-full my-5 items-center">
				<div className="flex gap-x-10 items-center">
					<SelectClass handleChange={handleChange} options={options} />
					<SelectClass handleChange={handleChange} options={options} />
					<Button content="시험 추가" key="addExam" handleClick={showAddExamModal} />
				</div>
				<div className="flex gap-x-10">
					<Button content="변경사항 저장" key="addScore" handleClick={showAddScoreModal} />
				</div>
			</div>

			<div className="my-10 flex flex-col align-center justify-center">
				<HotTable
					className="shadow-lg grayscale3 font-regular rounded-xl ml-auto mr-auto"
					data={TableData}
					maxRows={30}
					colWidths={[220, 220, 220, 220, 220, 220]}
					colHeaders={['교육생', '이메일', '반', '시험명', '점수', '시험 일시']}
					dropdownMenu={['filter_by_condition', 'filter_by_value']}
					contextMenu
					filters
					rowHeaders
					beforeRenderer={addClassesToRows}
					correctFormat
					licenseKey="non-commercial-and-evaluation"
				>
					<HotColumn data={0} readOnly className="htCenter" />
					<HotColumn
						data={6}
						readOnly
						className="htCenter"
						allowEmpty={false}
						allowRemoveColumn={false}
						allowRemoveRow={false}
					/>
					<HotColumn data={2} readOnly className="htCenter" />
					<HotColumn data={3} readOnly className="htCenter" />
					<HotColumn data={4} className="htCenter" type="numeric" />
					<HotColumn data={5} className="htCenter" type="date" />
				</HotTable>
			</div>

			{/* <div className="flex justify-between h-2/3">
				<div className="flex justify-between flex-col gap-x-10 w-2/3">
					<BarChart chartName="평균 성적" data={chartData} />
					<BarChart chartName="명준이의 성적" data={chartData} />
				</div>
				<div className="">
					<Table data={data} columns={columns} />
				</div>
			</div> */}
			<Modal
				title="성적 변경"
				open={isModalOpen}
				destroyOnClose
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleCancel} content="취소" type="cancel" key="cancelChangeScore" />,
					<Button
						handleClick={handleOk}
						content="확인"
						loading={isLoading}
						disabled={isDisabled}
						type="positive"
						key="ChangeScore"
					/>,
				]}
			>
				<div className="my-10 flex flex-col align-center justify-center">
					<div className="swal2-label">교육생</div>
					<input defaultValue={name} id="swal2-input" className="swal2-input" readOnly disabled />
					<div className="swal2-label">시험명</div>
					<input defaultValue={exam} id="swal2-input" className="swal2-input" readOnly disabled />
					<input value={score} onChange={(e) => setScore(e.target.value)} id="swal2-input" className="swal2-input" />
					<br />
					<br />
				</div>
			</Modal>
			<Modal
				title="시험 추가"
				open={isAddExamModalOpen}
				destroyOnClose
				onOk={handleAddExamOk}
				onCancel={handleAddExamCancel}
				maskClosable={false}
				footer={[
					<Button handleClick={handleAddExamCancel} content="취소" type="cancel" key="cancleExam" />,
					<Button
						handleClick={handleAddExamOk}
						content="확인"
						loading={isAddExamLoading}
						disabled={isAddExamModalDisabled}
						type="positive"
						key="addExamOk"
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
				</div>
			</Modal>
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
