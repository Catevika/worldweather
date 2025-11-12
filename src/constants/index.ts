import Cloud from '/src/assets/cloud.svg?react';
import Pressure from '/src/assets/pressure.svg?react';
import Sunrise from '/src/assets/sunrise.svg?react';
import Sunset from '/src/assets/sunset.svg?react';
import Uv from '/src/assets/uv.svg?react';
import Wind from '/src/assets/wind.svg?react';

export const rows = [
	{
		label: 'Cloudiness (%)',
		value: 'clouds',
		Icon: Cloud,
	},
	{
		label: 'UV Index (0-11+)',
		value: 'uvi',
		Icon: Uv,
	},
	{
		label: 'Wind Direction (°)',
		value: 'wind_deg',
		Icon: Wind,
	},
	{
		label: 'Pressure (hPa - hectopascals)',
		value: 'pressure',
		Icon: Pressure,
	},
	{
		label: 'Sunrise (local time)',
		value: 'sunrise',
		Icon: Sunrise,
	},
	{
		label: 'Sunset (local time)',
		value: 'sunset',
		Icon: Sunset,
	},
] as const;
