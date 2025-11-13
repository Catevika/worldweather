import {getGeocode} from '@/api';
import AdditionalInfo from '@/components/cards/AdditionalInfo';
import CurrentWeather from '@/components/cards/CurrentWeather';
import DailyForecast from '@/components/cards/DailyForecast';
import HourlyForecast from '@/components/cards/HourlyForecast';
import LocationDropdown from '@/components/dropdowns/LocationDropdown';
import MapTypeDropdown from '@/components/dropdowns/MapTypeDropdown';
import Map from '@/components/Map';
import type {Coords} from '@/types/types';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import MapLegend from './components/MapLegend';

function App() {
	const [coordinates, setCoords] = useState<Coords>({lat: 5, lon: 10});
	const [location, setLocation] = useState('Tokyo');
	const [mapType, setMapType] = useState('clouds_new');

	const {data: geocodeData} = useQuery({
		queryKey: ['location', location],
		queryFn: () => getGeocode(location),
	});

	const coords =
		location === 'custom'
			? coordinates
			: {lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0};

	const onMapClick = (lat: number, lon: number) => {
		setCoords({lat, lon});
		setLocation('custom');
	};

	return (
		<div className='flex flex-col gap-8'>
			<h1 className='text-6xl font-semibold text-center'>Your Weather</h1>
			<div className='flex gap-8 justify-center'>
				<div className='flex gap-4'>
					<h2 className='text-2xl font-semibold'>Location</h2>
					<LocationDropdown
						location={location}
						setLocation={setLocation}
					/>
				</div>
				<div className='flex gap-4'>
					<h2 className='text-2xl font-semibold'>Map Type</h2>
					<MapTypeDropdown
						mapType={mapType}
						setMapType={setMapType}
					/>
				</div>
			</div>
			<div className='relative'>
				<Map
					coords={coords}
					onMapClick={onMapClick}
					mapType={mapType}
				/>
				<MapLegend mapType={mapType} />
			</div>
			<CurrentWeather coords={coords} />
			<HourlyForecast coords={coords} />
			<DailyForecast coords={coords} />
			<AdditionalInfo coords={coords} />
		</div>
	);
}

export default App;
