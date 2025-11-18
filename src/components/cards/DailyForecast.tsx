import { getWeather } from '@/api';
import WeatherIcon from '@/components/WeatherIcon';
import Card from '@/components/cards/Card';
import type { Coords } from '@/types/types';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
	coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
	const { data } = useSuspenseQuery({
		queryKey: ['weather', coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
	});

	return (
		<Card
			title='Daily Forecast'
			childrenClassName='flex flex-col gap-4 2xl:justify-between'>
			{data?.daily?.map((day) => (
				<div
					key={day.dt}
					className='flex justify-between'>
					<p className='w-9'>
						{day?.dt ? new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' }) : '—'}
					</p>
					<WeatherIcon src={day?.weather?.[0]?.icon} />
					<p>{day?.temp?.day != null ? `${Math.round(day.temp.day)}°C` : '—'}</p>
					<p className='text-gray-500/75'>{day?.temp?.min != null ? `${Math.round(day.temp.min)}°C` : '—'}</p>
					<p className='text-gray-500/75'>{day?.temp?.max != null ? `${Math.round(day.temp.max)}°C` : '—'}</p>
				</div>
			))}
		</Card>
	);
}
