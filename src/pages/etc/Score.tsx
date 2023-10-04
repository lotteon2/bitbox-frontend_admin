import BarChart from '../../components/DashBoard/BarChart';

const Score = () => {
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

	return (
		<div>
			<div>
				<BarChart chartName="평균 성적" data={chartData} />
			</div>
		</div>
	);
};
export default Score;
