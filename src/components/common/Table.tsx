import React from 'react';
import { Table as AntdTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ATTENDANCE } from '../../constants/AttendanceType';

export interface DataType {
	key: number;
	title?: string;
	content?: string;
	date?: string;
	writer?: string;
	state?: string;
	rate?: string;
	name?: string;
	email?: string;
	imageSrc?: string;
	class?: string;
	isFinished?: boolean;
	classCode?: string;
	entranceTime?: string;
	quitTime?: string;
	attendanceState?: keyof typeof ATTENDANCE;
	attendanceModifyReason?: string;
	exam?: string;
	score?: number;
	avgScore?: number;
	isRead?: boolean;
}

interface TableInterface<T> {
	tableName?: string;
	columns: ColumnsType<T>;
	data: T[];
}

const Table: React.FC<TableInterface<DataType>> = ({ columns, data, tableName }) => {
	return (
		<div className="flex flex-col items-center rounded-xl w-full">
			{tableName && <div className="font-bold text-xl m-5">{tableName}</div>}
			<AntdTable
				key={tableName}
				columns={columns}
				dataSource={data}
				pagination={false}
				className="w-full shadow-lg grayscale3 font-regular"
				rowClassName={(record, index) => (record.isRead && record.isRead ? 'grayScale5' : 'grayScale1')}
			/>
		</div>
	);
};

export default React.memo(Table);
