import {useSuspenseQuery} from '@tanstack/react-query';
import {getWeather} from '../../api';
import WeatherIcon from '../WeatherIcon';
import Card from './Card';

type Props = {};

export default function HourlyForecast({}: Props) {
	const {data} = useSuspenseQuery({
		queryKey: ['weather'],
		queryFn: () => getWeather({lat: 50, lon: 50}),
	});

	return (
		<Card
			title='Hourly Forecast (48 Hours)'
			childrenClassName='flex gap-6 overflow-x-scroll'>
			{data?.hourly?.map((hour) => (
				<div
					className='flex flex-col items-center gap-2 p-2'
					key={hour.dt}>
					<p className='whitespace-nowrap'>
						{new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
							hour: 'numeric',
							minute: '2-digit',
							hour12: true,
						})}
					</p>
					<WeatherIcon src={hour.weather[0].icon} />
					<p>{Math.round(hour.temp)}°C</p>
				</div>
			))}
		</Card>
	);
}
