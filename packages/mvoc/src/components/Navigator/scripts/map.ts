import mapboxgl from 'mapbox-gl';
import WebMercatorViewport from '@math.gl/web-mercator';
import { FeatureProps } from 'src/utilities/helpers/features';
import { isOpenNow } from './timetable-helpers';

export class Map {
	mapElement: HTMLDivElement;
	map;
	markerTemplateElement: HTMLTemplateElement;
	markers: any[] = [];

	constructor({ element }: { element: HTMLDivElement }) {
		this.mapElement = element;
		this.markerTemplateElement = document.querySelector(
			'[data-module-bind="map__marker"]',
		);
	}

	startMap() {
		// zoom onto netherlands based on viewport width
		const boundedViewport = new WebMercatorViewport({
			width: window.innerWidth,
			height: window.innerHeight,
		}).fitBounds([
			[3.23390071158434, 50.5503661060614], // southwestern corner of the bounds
			[7.12749998189678, 54.0436329908026], // northeastern corner of the bounds
		]);

		this.map = new mapboxgl.Map({
			container: this.mapElement.id,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [5.180700346741352, 52.33146823204307], // Center of the netherlands
			zoom: boundedViewport.zoom,
		});
	}

	generateMarkers({ features }: { features: FeatureProps[] }) {
		const newFeatures = features.map((feature) => {
			const clone =
				this.markerTemplateElement.content.firstElementChild.cloneNode(
					true,
				) as HTMLButtonElement;
			const nameElement = clone.querySelector('[data-name]');
			const markerIconElement = clone.querySelector(
				'[data-marker-icon]',
			) as HTMLImageElement;

			nameElement.innerHTML = `${feature.properties.name}, ${feature.properties.location.city}`;
			if (isOpenNow(feature.properties.openingHours)) {
				clone.classList.add('is-open');
				markerIconElement.src = markerIconElement.dataset.srcOpen;
			}

			this.markers.push(
				new mapboxgl.Marker(clone)
					.setLngLat(feature.geometry.coordinates)
					.addTo(this.map),
			);
			return {
				...feature,
				markerElement: clone,
			};
		});

		return newFeatures;
	}

	zoomToFeature({ feature }: { feature: FeatureProps }) {
		const [longitude, latitude] = feature.geometry.coordinates;
		this.map.flyTo({
			center: [longitude, latitude],
			zoom: 16,
			speed: 2,
			essential: false,
		});
	}

	init() {
		this.startMap();
	}

	getMap() {
		return this.map;
	}
}
