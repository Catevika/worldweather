import {mapTypeData} from '@/constants';

type Props = {
	mapType: string;
};

export default function MapLegend({mapType}: Props) {
	const data = mapTypeData[mapType];

	const maxValue = data.stops[data.stops.length - 1].value;

	const gradientStops = data.stops
		.map((stop) => `${stop.color} ${(stop.value / maxValue) * 100}%`)
		.join(', ');

	return (
		<div className='absolute top-4 right-4 z-1000 w-48 xs:w-96 rounded-xl shadow-lg p-4 bg-background/50 border border-accent/70 flex flex-col gap-4'>
			<h3 className='text-sm font-semibold text-foreground'>{data.title}</h3>
			<div
				className='w-full h-6 rounded-xl border border-accent/70'
				style={{background: `linear-gradient(to right, ${gradientStops})`}}
			/>
			<div className='flex justify-between text-xs text-foreground'>
				<span>
					{data.stops[0].value} {data.unit}
				</span>
				<span>
					{data.stops[data.stops.length - 1].value} {data.unit}
				</span>
			</div>
		</div>
	);
}
