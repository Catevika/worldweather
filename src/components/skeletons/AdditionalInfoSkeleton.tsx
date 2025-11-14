import Card from '@/components/cards/Card';
import {Skeleton} from '@/components/ui/skeleton';

type Props = {};

export default function AdditionalInfoSkeleton({}: Props) {
	return (
		<Card
			title='Additional infos'
			childrenClassName='flex flex-col gap-8'>
			{Array.from({length: 6}).map((_, index) => (
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
