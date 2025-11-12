type Props = {
	title: string;
	children: React.ReactNode;
	childrenClassName?: string;
};

export default function Card({title, children, childrenClassName}: Props) {
	return (
		<div className='p-4 rounded-xl bg-zinc-900 shadow-md flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold'>{title}</h2>
			<div className={childrenClassName}>{children}</div>
		</div>
	);
}
