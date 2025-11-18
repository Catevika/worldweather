import { z } from 'zod';

const weatherSchema = z
	.object({
		lat: z.number(),
		lon: z.number(),
		timezone: z.string(),
		timezone_offset: z.number(),
		current: z
			.object({
				dt: z.number(),
				sunrise: z.number(),
				sunset: z.number(),
				temp: z.number(),
				feels_like: z.number(),
				pressure: z.number(),
				humidity: z.number(),
				dew_point: z.number().optional(),
				uvi: z.number().optional(),
				clouds: z.number(),
				visibility: z.number().optional(),
				wind_speed: z.number(),
				wind_deg: z.number(),
				wind_gust: z.number().optional(),
				weather: z.array(
					z.object({
						id: z.number(),
						main: z.string(),
						description: z.string(),
						icon: z.string(),
					}).partial(),
				),
			})
			.partial(),
		hourly: z
			.array(
				z
					.object({
						dt: z.number(),
						temp: z.number(),
						feels_like: z.number(),
						pressure: z.number(),
						humidity: z.number(),
						dew_point: z.number().optional(),
						uvi: z.number().optional(),
						clouds: z.number(),
						visibility: z.number().optional(),
						wind_speed: z.number(),
						wind_deg: z.number(),
						wind_gust: z.number().optional(),
						weather: z.array(
							z
								.object({
									id: z.number(),
									main: z.string(),
									description: z.string(),
									icon: z.string(),
								})
								.partial(),
						),
						pop: z.number().optional(),
					})
					.partial(),
			)
			.optional(),
		daily: z
			.array(
				z
					.object({
						dt: z.number(),
						sunrise: z.number(),
						sunset: z.number(),
						moonrise: z.number().optional(),
						moonset: z.number().optional(),
						moon_phase: z.number(),
						summary: z.string().optional(),
						temp: z
							.object({
								day: z.number(),
								min: z.number(),
								max: z.number(),
								night: z.number(),
								eve: z.number(),
								morn: z.number(),
							})
							.partial(),
						feels_like: z
							.object({
								day: z.number(),
								night: z.number(),
								eve: z.number(),
								morn: z.number(),
							})
							.partial(),
						pressure: z.number(),
						humidity: z.number(),
						dew_point: z.number().optional(),
						wind_speed: z.number(),
						wind_deg: z.number(),
						wind_gust: z.number().optional(),
						weather: z.array(
							z
								.object({
									id: z.number(),
									main: z.string(),
									description: z.string(),
									icon: z.string(),
								})
								.partial(),
						),
						clouds: z.number(),
						pop: z.number().optional(),
						rain: z.number().optional(),
						uvi: z.number().optional(),
					})
					.partial(),
			)
			.optional(),
	})
	.partial();

export default weatherSchema;
