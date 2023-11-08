import { mqWide, mqLargeUntil } from '@design-system/primitives/responsive';
import queryString from 'query-string';
import { trapFocus } from 'src/utilities/helpers/a11y';
import type {
	FeatureProps,
	FeaturesProps,
} from 'src/utilities/helpers/features';
import { generateDetail } from './generateDetail';
import { generateListItem } from './generateListItem';
import { Map } from './map';
import { isOpenNow } from './timetable-helpers';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { distance } from '@turf/turf';
import debounce from 'src/utilities/helpers/debounce';
import isVisibleInScrollContainer from 'src/utilities/helpers/visible-in-scrollcontainer';

export class Navigator {
	// element cache
	navigatorElement: HTMLDivElement;
	sidebarElement: HTMLDivElement;
	detailPaneElement: HTMLDivElement;
	detailElement: HTMLDivElement;
	detailTargetElement: HTMLDivElement;
	detailScrollerElement: HTMLDivElement;
	detailTemplateElement: HTMLTemplateElement;
	formElement: HTMLFormElement;
	listElement: HTMLUListElement;
	listNoResultElement: HTMLLIElement;
	loggerElement: HTMLSpanElement;
	interactionInitiator: 'list' | 'map' = 'list';

	// Mabox instance
	token: string;
	map: Map;
	mapElement: HTMLDivElement;
	mapInitialised: boolean = false;
	mapIsOpen: boolean = false;
	mapIsElevated: boolean = false;
	mapToggleButtonElement: HTMLButtonElement;
	mapToggleButtonListElement: HTMLSpanElement;
	mapToggleButtonMapElement: HTMLSpanElement;

	// Geocoder instance
	geocoder: MapboxGeocoder;
	geocoderElement: HTMLDivElement;

	// state
	locale: string;
	pathname: string;
	locations: FeatureProps[];
	hasBothAppointmentTypes: boolean = false;
	hasPzaAppointmentTypes: boolean = false;
	hasPmaAppointmentTypes: boolean = false;
	search: string = '';
	activeLocationSlug: string = '';
	activeDetailPage: HTMLDivElement;

	constructor(parent: HTMLDivElement) {
		this.navigatorElement = parent;
		this.sidebarElement = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__sidebar"]',
		);
		this.loggerElement = parent.querySelector('[data-logger]');
		this.detailPaneElement = parent.querySelector(
			'[data-module-bind="navigator__detail-pane"]',
		);
		this.detailElement = this.detailPaneElement.querySelector(
			'[data-module-bind="navigator__detail"]',
		);
		this.detailTargetElement = this.detailPaneElement.querySelector(
			'[data-module-bind="navigator__detail-target"]',
		);
		this.detailScrollerElement = this.detailPaneElement.querySelector(
			'[data-module-bind="navigator__detail-scroller"]',
		);
		this.detailTemplateElement = parent.querySelector(
			'[data-module-bind="navigator__detail__template"]',
		);
		this.listElement = parent.querySelector(
			'[data-module-bind="navigator__list"]',
		) as HTMLUListElement;
		this.listNoResultElement =
			this.listElement.querySelector('[data-no-result]');
		this.mapElement = parent.querySelector<HTMLDivElement>('#map');
		this.geocoderElement = parent.querySelector<HTMLDivElement>(
			'[data-module-bind="navigator__geocoder"]',
		);
		this.mapToggleButtonElement = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__map-toggle"]',
		);
		this.mapToggleButtonListElement =
			this.mapToggleButtonElement.querySelector('[data-list]');
		this.mapToggleButtonMapElement =
			this.mapToggleButtonElement.querySelector('[data-map]');
		this.token = parent.dataset.accessToken;
		this.formElement = parent.querySelector('[data-module="filter"]');
		this.locale = parent.dataset.locale;
		this.pathname = parent.dataset.pathname;
	}

	/**
	 * Get locations
	 */
	async getLocations() {
		const featuresData = await fetch('/data/v3/features.json');
		const features: FeaturesProps = await featuresData.json();
		this.locations = features.features;

		this.hasPmaAppointmentTypes = this.locations.some(
			(location) => location.properties?.appointmentType?.includes('pma'),
		);
		this.hasPzaAppointmentTypes = this.locations.some(
			(location) => location.properties?.appointmentType?.includes('pza'),
		);
		this.hasBothAppointmentTypes =
			this.hasPmaAppointmentTypes && this.hasPzaAppointmentTypes;
	}

	initView() {
		const heroElement = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__hero"]',
		) as HTMLDivElement;

		if (heroElement) {
			const checkSize = () => {
				const heroRect = heroElement.getBoundingClientRect();
				this.navigatorElement.style.setProperty(
					'--navigator__hero-size',
					`${heroRect.height}px`,
				);
			};
			window.addEventListener('resize', debounce(checkSize));

			checkSize();
		}
	}

	/**
	 * initialise list items
	 */
	initList() {
		// cache some elements
		const listItemTemplate = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__list-item"]',
		) as HTMLTemplateElement;
		const loadingElement = this.listElement.querySelector(
			'[data-loading]',
		) as HTMLLIElement;

		this.locations = this.locations.map((location) => {
			const listItem = generateListItem({
				location,
				template: listItemTemplate,
				locale: this.locale,
			});

			const labelContainerElement = listItem.querySelector(
				'[data-labels]',
			) as HTMLSpanElement;

			if (labelContainerElement && !this.hasBothAppointmentTypes) {
				labelContainerElement.remove();
			}
			// Get the newly created button in the list item
			const button = listItem.querySelector('button') as HTMLButtonElement;
			// Add eventlistener to update history without refresh
			button.addEventListener('click', () => {
				this.interactionInitiator = 'list';
				this.updateHistory({
					locatie: location.properties.slug,
					ggd: location.properties.ggdData.slug,
				});
			});

			this.listElement.appendChild(listItem);

			return {
				...location,
				element: listItem,
			};
		});

		// locations succesfully loaded, loading state can go
		loadingElement.remove();
	}

	/**
	 * Initialise detail view
	 */
	initDetailPane() {
		const detailCloseButton = this.detailPaneElement.querySelector(
			'[data-module-bind="navigator__detail-close"]',
		) as HTMLButtonElement;

		this.detailElement.addEventListener('transitionstart', (event) => {
			if (
				event.target === this.detailElement &&
				!this.detailPaneElement.classList.contains('is-active')
			) {
				// focus on active list item
				const previouslyActiveLocation = this.locations.filter(
					(location) => location.properties.slug === this.activeLocationSlug,
				)[0];

				if (this.interactionInitiator === 'map') {
					previouslyActiveLocation.markerElement
						.querySelector('button')
						.focus();
				} else {
					previouslyActiveLocation.element.querySelector('button').focus();
				}
			}
		});

		this.detailElement.addEventListener('transitionend', (event) => {
			if (event.target === this.detailElement) {
				const detailHeading = this.detailElement.querySelector(
					'h2',
				) as HTMLHeadingElement;
				if (this.detailPaneElement.classList.contains('is-active')) {
					detailHeading.focus();
					document.addEventListener(
						'keydown',
						trapFocus.bind(null, this.detailElement),
						false,
					);
				} else {
					this.detailPaneElement.classList.remove('is-visible');
					document.removeEventListener(
						'keydown',
						trapFocus.bind(null, this.detailElement),
						false,
					);
				}
			}
		});

		detailCloseButton.addEventListener('click', () => {
			this.updateHistory({ locatie: '', ggd: '' });
			this.onHistoryChange();
		});
	}

	/**
	 * Initialise filter form
	 */
	initFilter() {
		const searchFieldElement = this.formElement.querySelector(
			'#search',
		) as HTMLInputElement;
		const clearButtonElement = this.formElement.querySelector(
			'[data-module-bind="input-text__clear-button"]',
		) as HTMLButtonElement;

		const parsedQueryString = queryString.parse(window.location.search);

		const filterTogglesWrapElement =
			this.formElement.querySelector<HTMLFieldSetElement>(
				'[data-filter-toggles]',
			);

		const appointmentTypeFilters = [
			...filterTogglesWrapElement.querySelectorAll<HTMLElement>('#pza, #pma'),
		];

		if (this.hasBothAppointmentTypes) {
			appointmentTypeFilters.forEach(
				(filter) => (filter.closest<HTMLElement>('.e-control').hidden = false),
			);
		}

		if (this.hasPzaAppointmentTypes) {
			filterTogglesWrapElement.hidden = false;
		}

		// Set initial filters
		if (parsedQueryString.filter) {
			if (
				parsedQueryString.filter &&
				typeof parsedQueryString.filter === 'string'
			) {
				const input = this.formElement.querySelector(
					`[value="${parsedQueryString.filter}"]`,
				) as HTMLInputElement;
				input.checked = true;
			} else if (typeof parsedQueryString.filter === 'object') {
				parsedQueryString.filter.forEach((filter) => {
					const input = this.formElement.querySelector(
						`[value="${filter}"]`,
					) as HTMLInputElement;
					input.checked = true;
				});
			}
		}

		// prevent default submits
		this.formElement.addEventListener('submit', (event) => {
			event.preventDefault();
		});

		const onSearchChange = (event: Event) => {
			event.preventDefault();
			this.search = searchFieldElement.value;
			this.onHistoryChange();
		};

		searchFieldElement.addEventListener('input', onSearchChange);
		searchFieldElement.addEventListener('change', onSearchChange);
		clearButtonElement.addEventListener('click', onSearchChange);

		// listen for change in the form to update filters
		this.formElement.addEventListener('change', () => {
			const parsedQueryString = queryString.parse(window.location.search);
			const formData = new FormData(this.formElement);
			const formDataFilter = formData.getAll('filter');

			if (typeof formDataFilter === 'object') {
				parsedQueryString.filter = formDataFilter as string[];
			} else {
				parsedQueryString.filter = formDataFilter[0];
			}

			this.updateHistory({
				filter: parsedQueryString.filter,
			});
		});
	}

	initMap() {
		const mapCloseButton = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__map-close"]',
		) as HTMLButtonElement;

		this.map = new Map({ element: this.mapElement });
		this.map.init();
		this.locations = this.map.generateMarkers({ features: this.locations });

		this.locations.forEach((location) => {
			const button = location.markerElement.querySelector(
				'button',
			) as HTMLButtonElement;
			button.addEventListener('click', () => {
				this.interactionInitiator = 'map';
				this.lowerMap();
				this.updateHistory({
					locatie: location.properties.slug,
					ggd: location.properties.ggdData.slug,
				});
			});
		});

		this.mapToggleButtonElement.addEventListener(
			'click',
			this.toggleMap.bind(this),
		);
		mapCloseButton.addEventListener('click', () => {
			this.mapIsElevated && this.interactionInitiator === 'map'
				? this.lowerMap()
				: this.closeMap();
		});

		this.mapInitialised = true;
	}

	initGeocoder() {
		if (!this.geocoderElement) return;
		this.geocoder = new MapboxGeocoder({ accessToken: this.token });
		this.geocoder.setLanguage(this.locale);
		this.geocoder.setCountries(this.locale);
		this.geocoder.addTo(this.geocoderElement);

		this.geocoder.on('result', (event) => {
			const searchResult = event.result.geometry as {
				coordinates: [number, number];
			};

			this.locations = this.locations.map((location) => {
				return {
					...location,
					properties: {
						...location.properties,
						distance: distance(
							searchResult.coordinates,
							location.geometry.coordinates,
						),
					},
				};
			});

			// sort locations by distance from geolocation
			this.locations.sort((a, b) => {
				if (a.properties.distance > b.properties.distance) {
					return 1;
				}
				if (a.properties.distance < b.properties.distance) {
					return -1;
				}
				return 0;
			});

			// Remove old and add new user location marker
			this.map.generateUserMarker({ position: searchResult.coordinates });

			const visibleLocations = this.locations.filter(
				(location) => location.element.hidden === false,
			);

			if (visibleLocations.length) {
				// Fit map to boundingbox
				this.map.setBoundingBox({
					collection: [
						...visibleLocations
							.slice(0, 3)
							.map((location) => location.geometry.coordinates),
						searchResult.coordinates,
					],
				});
			}

			// trigger history change
			this.onHistoryChange();
		});

		// Remove user marker when geocoder is cleared and remove distance from locations
		this.geocoder.on('clear', (event) => {
			this.map.removeUserMarker();

			this.locations = this.locations.map((location) => {
				return {
					...location,
					properties: {
						...location.properties,
						distance: undefined,
					},
				};
			});

			// Sort locations again by city name
			this.locations.sort((a, b) => {
				var textA = a.properties.location.city.toUpperCase();
				var textB = b.properties.location.city.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});

			this.map.zoomToFull();

			// trigger history change
			this.onHistoryChange();
		});
	}

	toggleMap() {
		this.mapIsOpen ? this.closeMap() : this.openMap();
	}

	closeMap() {
		this.mapIsOpen = false;
		this.lowerMap();
		this.navigatorElement.classList.remove('show-map');
		this.mapToggleButtonListElement.hidden = true;
		this.mapToggleButtonMapElement.hidden = false;
		this.mapToggleButtonElement.focus();
	}

	openMap() {
		this.mapIsOpen = true;
		this.navigatorElement.classList.add('show-map');
		this.mapToggleButtonListElement.hidden = false;
		this.mapToggleButtonMapElement.hidden = true;
		this.mapElement.focus();
	}

	toggleMapElevation() {
		this.mapIsElevated ? this.lowerMap() : this.elevateMap();
	}

	elevateMap() {
		this.mapIsElevated = true;
		this.navigatorElement.classList.add('elevate-map');
	}

	lowerMap() {
		this.mapIsElevated = false;
		this.navigatorElement.classList.remove('elevate-map');
	}

	/**
	 * Update history with properties
	 */
	updateHistory({
		locatie,
		ggd,
		filter,
	}: {
		locatie?: string;
		ggd?: string;
		filter?: string | string[];
	}) {
		const parsedQueryString = queryString.parse(window.location.search);
		if (locatie) parsedQueryString.locatie = locatie;
		if (typeof locatie === 'string' && locatie.length === 0) {
			delete parsedQueryString['locatie'];
		}
		if (ggd) parsedQueryString.ggd = ggd;
		if (typeof ggd === 'string' && ggd.length === 0) {
			delete parsedQueryString['ggd'];
		}
		if (filter) parsedQueryString.filter = filter;

		const urlString = queryString.stringify(parsedQueryString);

		history.pushState(
			{},
			'',
			`${this.pathname}${urlString ? `?${urlString}` : ''}`,
		);
		this.onHistoryChange();
	}

	/**
	 * When history changes, do stuff
	 */
	onHistoryChange() {
		const parsedQueryString = queryString.parse(window.location.search);
		// store filter in array even if its a string
		const filter = parsedQueryString.filter
			? typeof parsedQueryString.filter === 'object'
				? parsedQueryString.filter
				: [parsedQueryString.filter]
			: [];

		this.locations.forEach((location) => {
			let show = true;
			if (filter.includes('status-open')) {
				show = !!isOpenNow(location.properties.openingHours);
			}

			// Add logic to filter based on "appointmentType" ('pma', 'pza', etc.)
			if (filter.includes('pza') && filter.includes('pma')) {
				if (
					!location.properties?.appointmentType?.includes('pza') &&
					!location.properties?.appointmentType?.includes('pma')
				) {
					show = false;
				}
			} else if (filter.includes('pza')) {
				if (!location.properties?.appointmentType?.includes('pza')) {
					show = false;
				}
			} else if (filter.includes('pma')) {
				if (!location.properties?.appointmentType?.includes('pma')) {
					show = false;
				}
			}

			// search query filter
			const filterValue = this.search.trim().toLowerCase().replace(/\W+/g, '');
			if (filterValue && show) {
				const city = location.properties.location.city
					.toLowerCase()
					.replace(/\W+/g, '');
				show = city.includes(filterValue);
			}

			location.element.hidden = !show;
			if (this.mapInitialised) {
				location.markerElement.hidden = !show;
			}

			// update distance dom element to increments of 0.5
			if (location.properties.distance) {
				location.element.classList.add('has-distance');
				location.element.querySelector('[data-distance]').innerHTML = (
					Math.round(location.properties.distance * 2) / 2
				).toString();
			} else {
				location.element.classList.remove('has-distance');
				location.element.querySelector('[data-distance]').innerHTML = '';
			}

			// order element in DOM
			this.listElement.appendChild(location.element);
		});

		this.listNoResultElement.hidden = !!this.locations.filter(
			(location) => !location.element.hidden,
		).length;

		this.locations.forEach((location) => {
			location.element.classList.remove('is-active-location');
			location.markerElement.classList.remove('is-active-location');
		});

		// hide/show detail pane
		if (parsedQueryString.locatie) {
			this.activeLocationSlug = parsedQueryString.locatie as string;
			const newLocation = this.locations.filter(
				(location) => location.properties.slug === this.activeLocationSlug,
			)[0];
			if (newLocation) {
				if (
					!isVisibleInScrollContainer(newLocation.element, this.sidebarElement)
				) {
					newLocation.element.scrollIntoView({
						block: 'center',
						inline: 'nearest',
					});
				}

				newLocation.element.classList.add('is-active-location');
				newLocation.markerElement.classList.add('is-active-location');

				const newDetailElement = generateDetail({
					location: newLocation,
					template: this.detailTemplateElement,
					locale: this.locale,
					accessToken: this.token,
				});

				// show the map overview after map preview is clicked by overriding z-indexes
				const mapOverviewButton = newDetailElement.querySelector(
					'[data-module-bind="navigator__map-preview"]',
				) as HTMLButtonElement;

				if (window.matchMedia(mqLargeUntil).matches) {
					if (mapOverviewButton) {
						mapOverviewButton.addEventListener('click', () => {
							if (!this.mapIsOpen) {
								this.openMap();
							}
							this.elevateMap();
						});
					}
				}

				this.activeDetailPage?.remove();
				this.activeDetailPage = newDetailElement;
				this.detailTargetElement.appendChild(newDetailElement);
				this.detailScrollerElement.scrollTo(0, 0);

				this.detailPaneElement.classList.add('is-active');
				this.detailPaneElement.classList.add('is-visible');

				// calulate the zoomToFeature offset by dividing the detailPaneElement by 2 only for wide screens
				const offset = this.detailPaneElement.offsetWidth / 2;

				// zoom map
				this.map.zoomToFeature({
					feature: newLocation,
					offset: window.matchMedia(mqWide).matches ? offset : 0,
				});
			}
		} else {
			this.detailPaneElement.classList.remove('is-active');
		}
	}

	/**
	 * Initialise navigator
	 */
	async init() {
		// Get locations
		await this.getLocations();

		// Initialise sections
		this.initView();
		this.initList();
		this.initMap();
		this.initGeocoder();
		this.initDetailPane();
		this.initFilter();

		// Initialise onHistoryChange
		window.onpopstate = () => {
			this.onHistoryChange();
		};
		this.onHistoryChange();
	}
}
