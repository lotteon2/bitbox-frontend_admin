import React from 'react';
import { BarChart as RechartBarchart, Bar, XAxis, YAxis } from 'recharts';

interface BarChartInterface {
	chartName: string;
	data: { name: string; num: number }[];
}

const BarChart: React.FC<BarChartInterface> = ({ chartName, data }) => {
	return (
		<div className="shadow-lg grayscale3 flex flex-col items-center rounded-xl">
			<div className="font-bold text-xl">{chartName}</div>
			<RechartBarchart width={700} height={300} data={data}>
				<Bar dataKey="num" className="fill-primary3" />
				<XAxis dataKey="name" className="font-regular" />
				<YAxis className="font-regular" />
			</RechartBarchart>
		</div>
	);
};

export default BarChart;
