import Card from '@/components/cards/Card';
import { Skeleton } from '@/components/ui/skeleton';

export default function HourlySkeleton() {
	return (
		<Card
			title='Hourly Forecast (48 Hours)'
			childrenClassName='flex gap-6 overflow-x-scroll'>
			{Array.from({ length: 48 }).map((_, index) => (
				<div
					className='flex flex-col 2xl:justify-between items-center gap-2 p-2'
					key={index}>
					<Skeleton className='w-16 h-6 2xl:scale-110' />
					<Skeleton className='size-8 2xl:size-10 rounded-full' />
					<Skeleton className='w-8 h-6 2xl:scale-110' />
				</div>
			))}
		</Card>
	);
}
