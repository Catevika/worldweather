import Card from '@/components/cards/Card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdditionalInfoSkeleton() {
	return (
		<Card
			title='Additional infos'
			childrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8'>
			{Array.from({ length: 6 }).map((_, index) => (
				<div
					className='flex justify-between'
					key={index}>
					<div className='flex items-center'>
						<Skeleton className='w-20 h-8' />
						<Skeleton className='ml-2 size-8 rounded-full' />
					</div>
					<span>
						<Skeleton className='size-8' />
					</span>
				</div>
			))}
		</Card>
	);
}
