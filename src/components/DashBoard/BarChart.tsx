import React, { useEffect, useState } from 'react';
import { BarChart as RechartBarchart, Bar, XAxis, YAxis } from 'recharts';
import useWindowDimensions from '../../libs/core/react-query/hooks/useWindowDimensions';

interface BarChartInterface {
	chartName?: string;
	data: { name: string; num: number }[];
}

const BarChart: React.FC<BarChartInterface> = ({ chartName, data }) => {
	const [chartWidth, setChartWidth] = useState<number>(700);
	const { height, width } = useWindowDimensions();
	useEffect(() => {
		// eslint-disable-next-line no-restricted-globals
		if (!width) return;
		if (width < 640) {
			setChartWidth(250);
		} else if (width < 768) {
			setChartWidth(400);
		} else if (width < 1024) {
			setChartWidth(500);
		} else {
			setChartWidth(700);
		}
		console.log(width);
		// eslint-disable-next-line no-restricted-globals
	}, [width]);
	return (
		<div className={`shadow-lg grayscale3 flex flex-col items-center rounded-xl w-[${chartWidth + 100}px]`}>
			<div className="font-bold text-xl">{chartName}</div>
			<RechartBarchart width={chartWidth} height={300} data={data}>
				<Bar dataKey="num" className="fill-primary3" radius={[5, 5, 0, 0]} barSize={25} />
				<XAxis dataKey="name" className="font-regular" />
				<YAxis className="font-regular" />
			</RechartBarchart>
		</div>
	);
};

export default React.memo(BarChart);
