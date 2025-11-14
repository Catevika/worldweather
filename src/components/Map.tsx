import type {Coords} from '@/types/types';
import {MaptilerLayer} from '@maptiler/leaflet-maptilersdk';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect} from 'react';
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet';

const API_KEY = import.meta.env.VITE_API_KEY;
const MAPTILE_API_KEY = import.meta.env.VITE_MAPTILE_API_KEY;

type Props = {
	coords: Coords;
	onMapClick: (lat: number, lon: number) => void;
	mapType: string;
};

export default function Map({coords, onMapClick, mapType}: Props) {
	const {lat, lon} = coords;

	return (
		<MapContainer
			center={[lat, lon]}
			zoom={5}
			style={{
				width: '1000px',
				height: '500px',
				margin: '0 auto',
			}}>
			<MapClick
				onMapClick={onMapClick}
				coords={coords}
			/>
			<MapTileLayer />
			<TileLayer
				opacity={0.7}
				url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
			/>
			<Marker position={[lat, lon]} />
		</MapContainer>
	);
}

function MapClick({
	onMapClick,
	coords,
}: {
	onMapClick: (lat: number, lon: number) => void;
	coords: Coords;
}) {
	const map = useMap();

	useEffect(() => {
		map.panTo([coords.lat, coords.lon]);
	}, [map, coords.lat, coords.lon]);

	useEffect(() => {
		const handler = (e: any) => {
			const {lat, lng} = e.latlng;
			onMapClick(lat, lng);
		};

		map.on('click', handler);
		return () => {
			map.off('click', handler);
		};
	}, [map, onMapClick]);

	return null;
}

function MapTileLayer() {
	const map = useMap();

	useEffect(() => {
		let activeLayer: any | null = null;
		const controller = new AbortController();

		// If no MapTiler API key is provided, fall back to OpenStreetMap tiles
		if (!MAPTILE_API_KEY) {
			const osm = new L.TileLayer(
				'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				{
					attribution: '© OpenStreetMap contributors',
				},
			);
			osm.addTo(map);
			activeLayer = osm;
			return () => {
				map.removeLayer(osm);
			};
		}

		const styleUrl = `https://api.maptiler.com/maps/basic-dark/style.json?key=${MAPTILE_API_KEY}`;

		(async () => {
			try {
				const resp = await fetch(styleUrl, {signal: controller.signal});
				if (!resp.ok) throw new Error(`Style fetch failed: ${resp.status}`);
				const styleJson = await resp.json();
				// Pass a full StyleSpecification object to MaptilerLayer to avoid setStyle URL problems.
				const tileLayer = new MaptilerLayer({
					style: styleJson,
					apiKey: MAPTILE_API_KEY,
				});
				tileLayer.addTo(map);
				activeLayer = tileLayer;
			} catch (err: any) {
				if (err.name === 'AbortError') return;
				console.warn(
					'MapTiler style load failed, falling back to OpenStreetMap tiles',
					err,
				);
				const osm = new L.TileLayer(
					'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					{
						attribution: '© OpenStreetMap contributors',
					},
				);
				osm.addTo(map);
				activeLayer = osm;
			}
		})();

		return () => {
			controller.abort();
			if (activeLayer) {
				map.removeLayer(activeLayer);
			}
		};
	}, [map]);

	return null;
}
