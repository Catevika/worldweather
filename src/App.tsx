import { getGeocode } from '@/api';
import AdditionalInfo from '@/components/cards/AdditionalInfo';
import CurrentWeather from '@/components/cards/CurrentWeather';
import DailyForecast from '@/components/cards/DailyForecast';
import HourlyForecast from '@/components/cards/HourlyForecast';
import LocationDropdown from '@/components/dropdowns/LocationDropdown';
import MapTypeDropdown from '@/components/dropdowns/MapTypeDropdown';
import MapLegend from '@/components/MapLegend';
import { lazy, Suspense, useState } from 'react';
const Map = lazy(() => import('@/components/Map'));
const SidePanel = lazy(() => import('@/components/SidePanel'));
import AdditionalInfoSkeleton from '@/components/skeletons/AdditionalInfoSkeleton';
import CurrentSkeleton from '@/components/skeletons/CurrentSkeleton';
import DailySkeleton from '@/components/skeletons/DailySkeleton';
import HourlySkeleton from '@/components/skeletons/HourlySkeleton';
import type { Coords } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
// (lazy + Suspense imported above)
import MobileHeader from '@/components/MobileHeader';
import Hamburger from '@/assets/hamburger.svg?react';
import LightDarkToggle from '@/components/LightDarkToggle';

function App() {
	const [coordinates, setCoords] = useState<Coords>({ lat: 5, lon: 10 });
	const [location, setLocation] = useState('Tokyo');
	const [mapType, setMapType] = useState('clouds_new');
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

	const { data: geocodeData } = useQuery({
		queryKey: ['location', location],
		queryFn: () => getGeocode(location),
	});

	const coords =
		location === 'custom'
			? coordinates
			: { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

	const onMapClick = (lat: number, lon: number) => {
		setCoords({ lat, lon });
		setLocation('custom');
	};

	return (
		<>
			<MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
			<div className='flex flex-col gap-8 pt-4 xs:pt-8 p-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]'>
				<div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
					<div className="flex flex-col md:flex-row gap-2 md:gap-4">
						<h2 className='text-2xl font-semibold'>Location</h2>
						<LocationDropdown
							location={location}
							setLocation={setLocation}
						/>
					</div>
					<div className='flex flex-col md:flex-row gap-2 md:gap-4'>
						<h2 className='text-2xl font-semibold whitespace-nowrap'>Map Type</h2>
						<MapTypeDropdown
							mapType={mapType}
							setMapType={setMapType}
						/>
					</div>
					<div className='ml-auto flex gap-4 items-center'>
						<div className='hidden xs:block'>
							<LightDarkToggle />
						</div>
						<button onClick={() => setIsSidePanelOpen(true)} className='hidden xs:block'>
							<Hamburger className='size-6 invert lg:hidden' />
						</button>
					</div>
				</div>
				<div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
					<div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
						<Suspense fallback={<div className='h-full w-full bg-background' />}>
							<Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
							<MapLegend mapType={mapType} />
						</Suspense>
					</div>
					<div className='col-span-1 2xl:row-span-2 order-2'>
						<Suspense fallback={<CurrentSkeleton />}>
							<CurrentWeather coords={coords} />
						</Suspense>
					</div>
					<div className='col-span-1 2xl:row-span-2 order-3 2xl:order-4'>
						<Suspense fallback={<DailySkeleton />}>
							<DailyForecast coords={coords} />
						</Suspense>
					</div>
					<div className='col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3'>
						<Suspense fallback={<HourlySkeleton />}>
							<HourlyForecast coords={coords} />
						</Suspense>
					</div>
					<div className='col-span-1 md:col-span-2 2xl:row-span-1 order-5'>
						<Suspense fallback={<AdditionalInfoSkeleton />}>
							<AdditionalInfo coords={coords} />
						</Suspense>
					</div>
				</div>
			</div>
			<Suspense fallback={null}>
				<SidePanel
					coords={coords}
					isSidePanelOpen={isSidePanelOpen}
					setIsSidePanelOpen={setIsSidePanelOpen}
				/>
			</Suspense>
		</>
	);
}

export default App;
