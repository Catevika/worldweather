import {Skeleton} from '@/components/ui/skeleton';
import Card from '../cards/Card';

export default function HourlySkeleton() {
	return (
		<Card
			title='Hourly Forecast (48 Hours)'
			childrenClassName='flex gap-6 overflow-x-scroll'>
			{Array.from({length: 48}).map((_, index) => (
				<div
					className='flex flex-col items-center gap-2 p-2'
					key={index}>
					<Skeleton className='w-16 h-6' />
					<Skeleton className='size-8' />
					<Skeleton className='w-8 h-6' />
				</div>
			))}
		</Card>
	);
}
