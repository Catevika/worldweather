import { getWeather } from '@/api';
import UpArrow from '@/assets/uparrow.svg?react';
import Card from '@/components/cards/Card';
import { rows } from '@/constants';
import type { Coords } from '@/types/types';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
	coords: Coords;
};

export default function AdditionalInfo({ coords }: Props) {
	const { data } = useSuspenseQuery({
		queryKey: ['weather', coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
	});

	return (
		<Card
			title='Additional Weather Info'
			childrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8'>
			{rows.map(({ label, value, Icon }) => (
				<div
					className='flex justify-between items-center'
					key={value}>
					<div className='flex gap-4'>
						<Icon className='size-8' />
						<span className='text-gray-500'>{label}</span>
					</div>
					<span>
						<FormatComponent
							value={value}
							number={data?.current[value]}
						/>
					</span>
				</div>
			))}
		</Card>
	);
}

function FormatComponent({ value, number }: { value: string; number: number; }) {
	if (value === 'sunrise' || value === 'sunset')
		return new Date(number * 1000).toLocaleTimeString(undefined, {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});

	if (value === 'wind_deg')
		return (
			<UpArrow
				style={{ transform: `rotate(${number}deg)` }}
				className='size-8'
			/>
		);

	return number;
}
