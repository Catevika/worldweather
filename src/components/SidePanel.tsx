import {getAirPollution} from '@/api';
import Chevron from '@/assets/ChevronLeft.svg?react';
import Information from '@/assets/information.svg?react';
import Card from '@/components/cards/Card';
import SidePanelSkeleton from '@/components/skeletons/SidePanelSkeleton';
import {Slider} from '@/components/ui/slider';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {airQualityRanges, pollutantNameMapping} from '@/constants';
import type {Coords, Pollutant} from '@/types/types';
import {useSuspenseQuery} from '@tanstack/react-query';
import clsx from 'clsx';
import {Suspense} from 'react';

type Props = {
	coords: Coords;
	isSidePanelOpen: boolean;
	setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SidePanel({
	coords,
	isSidePanelOpen,
	setIsSidePanelOpen,
}: Props) {
	return (
		<div
			className={clsx(
				'fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!',
				isSidePanelOpen ? 'translate-x-0' : 'translate-x-full',
			)}>
			<button onClick={() => setIsSidePanelOpen(false)}>
				<Chevron className='size-8 invert -ml-2 lg:hidden' />
			</button>
			<Suspense fallback={<SidePanelSkeleton />}>
				<AirPollution
					coords={coords}
					isSidePanelOpen={isSidePanelOpen}
					setIsSidePanelOpen={setIsSidePanelOpen}
				/>
			</Suspense>
		</div>
	);
}

function AirPollution({coords}: Props) {
	const {data} = useSuspenseQuery({
		queryKey: ['pollution', coords],
		queryFn: () => getAirPollution(coords),
	});

	return (
		<div
			className='flex flex-col gap-4'
			key={data?.list[0].dt}>
			<h1 className='text-2xl font-semibold'>Air Pollution</h1>
			<div className='flex items-center'>
				<h2 className='text-3xl font-semibold'>AQI</h2>
				<div className='flex items-center gap-2'>
					<Tooltip>
						<TooltipTrigger>
							<Information className='size-7 invert cursor-pointer mt-1 ml-2' />
						</TooltipTrigger>
						<TooltipContent className='z-2000'>
							<div className='max-w-xs text-lg'>
								{' '}
								<p>Air Quality Index:</p>
								<p>1 = Good,</p>
								<p>2 = Fair,</p>
								<p>3 = Moderate,</p>
								<p>4 = Poor,</p>
								<p>5 = Very Poor</p>
							</div>
						</TooltipContent>
					</Tooltip>
				</div>
				<h3 className='text-3xl font-semibold ml-auto'>
					{data?.list[0].main.aqi}
				</h3>
			</div>

			{Object.entries(data?.list[0].components).map(([key, value]) => {
				const pollutant =
					airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges];
				const max = Math.max(pollutant['Very Poor'].min, value);
				const currentLevel = (() => {
					for (const [level, range] of Object.entries(pollutant)) {
						if (
							value >= range.min &&
							(range.max === null || value <= range.max)
						) {
							return level;
						}
					}
					return 'Very Poor';
				})();

				const qualityColor = (() => {
					switch (currentLevel) {
						case 'Good':
							return 'bg-green-500';
						case 'Fair':
							return 'bg-yellow-500';
						case 'Moderate':
							return 'bg-orange-500';
						case 'Poor':
							return 'bg-red-500';
						case 'Very Poor':
							return 'bg-purple-500';
						default:
							return 'zinc-500';
					}
				})();

				return (
					<Card
						className='hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!'
						childrenClassName='flex flex-col gap-3'
						key={key}>
						<div className='flex justify-between'>
							<div className='flex items-center gap-2'>
								<span className='text-lg font-bold capitalize'>{key}</span>
								<Tooltip>
									<TooltipTrigger>
										<Information className='size-5 invert cursor-pointer mt-1 ml-2' />
									</TooltipTrigger>
									<TooltipContent className='z-2000'>
										<p className='max-w-xs text-lg'>
											Concentration of{' '}
											{pollutantNameMapping[key.toUpperCase() as Pollutant]}
										</p>
									</TooltipContent>
								</Tooltip>
							</div>
							<span className='text-lg font-semibold'>{value}</span>
						</div>
						<Slider
							min={0}
							max={max}
							value={[value]}
							disabled
						/>
						<div className='flex justify-between text-xs'>
							<p>0</p>
							<p>{max}</p>
						</div>
						<div className='flex justify-between'>
							{Object.keys(pollutant).map((quality) => (
								<span
									key={quality}
									className={
										(clsx('px-2 py-1 rounded-md text-xs font-medium'),
										quality === currentLevel
											? clsx(
													qualityColor,
													'text-zinc-900 font-semibold py-0.5 px-1.5 rounded-md',
											  )
											: 'bg-muted text-muted-foreground')
									}>
									{quality}
								</span>
							))}
						</div>
					</Card>
				);
			})}
		</div>
	);
}
