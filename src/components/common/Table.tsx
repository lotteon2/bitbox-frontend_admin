import React from 'react';
import { Table as AntdTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
	key: string;
	title?: string;
	content?: string;
	date?: string;
	writer?: string;
	state?: string;
	rate?: string;
	name?: string;
	email?: string;
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
			<AntdTable columns={columns} dataSource={data} pagination={false} className="w-full shadow-lg grayscale3" />
		</div>
	);
};

export default Table;
