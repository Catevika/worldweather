import SideCardSkeleton from '@/components/skeletons/SideCardSkeleton';
import {Skeleton} from '@/components/ui/skeleton';

export default function SidePanelSkeleton() {
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-2xl font-semibold'>Air Pollution</h1>
			<div className='flex items-center'>
				<h2 className='text-3xl font-semibold'>AQI</h2>
				<div className='flex items-center gap-2'></div>
				<Skeleton className='size-7 mt-1 ml-2' />
				<Skeleton className='w-4 h-9 ml-auto rounded-md' />
			</div>
			{Array.from({length: 8}).map((_, index) => (
				<SideCardSkeleton key={index} />
			))}
		</div>
	);
}
