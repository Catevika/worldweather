import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { mapTypes } from '@/constants';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
	mapType: string;
	setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
	return (
		<Select
			value={mapType}
			onValueChange={(value) => setMapType(value)}>
			<SelectTrigger className='w-full xs:w-[180px] capitalize'>
				<SelectValue placeholder='Theme' />
			</SelectTrigger>
			<SelectContent className='z-1001'>
				{mapTypes.map((mapType) => (
					<SelectItem
						className='capitalize'
						key={mapType}
						value={mapType}>
						{mapType.split('_')[0]}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
