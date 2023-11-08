import mapboxgl from 'mapbox-gl';
import { bbox, lineString, type Position } from '@turf/turf';
import type { FeatureProps } from 'src/utilities/helpers/features';
import { isOpenNow } from './timetable-helpers';

export class Map {
	mapElement: HTMLDivElement;
	map: any;
	userMarkerTemplateElement: HTMLTemplateElement;
	markerTemplateElement: HTMLTemplateElement;
	userMarker: mapboxgl.Marker = undefined;
	markers: any[] = [];
	boundsFull: [[number, number], [number, number]] = [
		[3.23390071158434, 50.5503661060614], // southwestern corner of the bounds
		[7.12749998189678, 54.0436329908026], // northeastern corner of the bounds
	];
	centerMap: [number, number] = [5.180700346741352, 52.33146823204307]; // Center of the netherlands
	previousBounds: any;

	constructor({ element }: { element: HTMLDivElement }) {
		this.mapElement = element;
		this.userMarkerTemplateElement = document.querySelector(
			'[data-module-bind="map__marker-user"]',
		);
		this.markerTemplateElement = document.querySelector(
			'[data-module-bind="map__marker"]',
		);
	}

	startMap() {
		// zoom onto netherlands
		this.map = new mapboxgl.Map({
			container: this.mapElement.id,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: this.centerMap,
		}).fitBounds(this.boundsFull, {
			duration: 0,
		});

		this.map.on('zoomend', (event) => {
			if (event.originalEvent) {
				this.storeCurrentBounds();
			}
		});
	}

	generateMarkers({ features }: { features: FeatureProps[] }) {
		const newFeatures = features.map((feature) => {
			const clone =
				this.markerTemplateElement.content.firstElementChild.cloneNode(
					true,
				) as HTMLButtonElement;
			const nameElement = clone.querySelector('[data-name]');

			nameElement.innerHTML = `${feature.properties.name}, ${feature.properties.location.city}`;
			if (isOpenNow(feature.properties.openingHours)) {
				clone.classList.add('is-open-location');
			}

			if (feature.properties?.isTestLocation) {
				clone.classList.add('is-test-location');
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

	// Remove old and add new user location marker
	generateUserMarker({ position }: { position: [number, number] }) {
		this.removeUserMarker();

		const clone =
			this.userMarkerTemplateElement.content.firstElementChild.cloneNode(
				true,
			) as HTMLImageElement;

		this.userMarker = new mapboxgl.Marker(clone)
			.setLngLat(position)
			.addTo(this.map);
	}

	removeUserMarker() {
		if (this.userMarker) this.userMarker.remove();
	}

	zoomToFeature({
		feature,
		offset = 0,
	}: {
		feature: FeatureProps;
		offset: number;
	}) {
		const [longitude, latitude] = feature.geometry.coordinates;

		this.map.flyTo({
			center: [longitude, latitude],
			zoom: 16,
			speed: 2,
			essential: false,
			offset: [offset, 0],
		});
	}

	zoomToFull() {
		this.map.fitBounds(this.boundsFull);
	}

	getBoundingBox({ collection }: { collection: Position[] }) {
		const line = lineString(collection);
		return bbox(line);
	}

	setBoundingBox({ collection }: { collection: Position[] }) {
		this.map.fitBounds(this.getBoundingBox({ collection }), {
			padding: 72,
		});
	}

	storeCurrentBounds() {
		this.previousBounds = this.map.getBounds();
	}

	restorePreviousBounds() {
		if (this.previousBounds) {
			this.map.fitBounds(this.previousBounds, {
				speed: 2,
			});
		}
	}

	init() {
		this.startMap();
	}

	getMap() {
		return this.map;
	}
}
