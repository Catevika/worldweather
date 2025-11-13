import clsx from 'clsx';

type Props = {
	title: string;
	children: React.ReactNode;
	childrenClassName?: string;
};

export default function Card({title, children, childrenClassName}: Props) {
	return (
		<div className='p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold'>{title}</h2>
			<div
				className={clsx(
					childrenClassName,
					'animate-[fade-in_1s_ease-out_forwards]',
				)}>
				{children}
			</div>
		</div>
	);
}
