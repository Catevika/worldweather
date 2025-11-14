export type Coords = {
	lat: number;
	lon: number;
};

export type ColorStop = {
	value: number;
	color: string;
	opacity?: number;
};

export type MapTypeData = Record<
	string,
	{title: string; unit: string; stops: ColorStop[]}
>;

export type AirQualityLevel =
	| 'Good'
	| 'Fair'
	| 'Moderate'
	| 'Poor'
	| 'Very Poor';

export type Range = {
	min: number;
	max: number | null;
};

export type Pollutant =
	| 'SO2'
	| 'NO2'
	| 'PM10'
	| 'PM2_5'
	| 'O3'
	| 'CO'
	| 'NO'
	| 'NH3';

export type AirQualityRanges = Record<
	Pollutant,
	Record<AirQualityLevel, Range>
>;

export type PollutantNameMapping = Record<Pollutant, string>;
