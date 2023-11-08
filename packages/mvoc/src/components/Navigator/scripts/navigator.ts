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
import debounce from 'src/utilities/helpers/debounce';

export class Navigator {
	// element cache
	navigatorElement: HTMLDivElement;
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

	// Mabox instance, TODO: fix any
	map: any;
	mapElement: HTMLDivElement;
	mapInitialised: boolean = false;
	mapShown: boolean = false;
	token: string;

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
					previouslyActiveLocation.element.scrollIntoView({
						block: 'center',
						inline: 'nearest',
					});
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
		const mapToggleButtonElement = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__map-toggle"]',
		) as HTMLButtonElement;
		const mapToggleButtonListElement = mapToggleButtonElement.querySelector(
			'[data-list]',
		) as HTMLSpanElement;
		const mapToggleButtonMapElement = mapToggleButtonElement.querySelector(
			'[data-map]',
		) as HTMLSpanElement;

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
				this.updateHistory({
					locatie: location.properties.slug,
					ggd: location.properties.ggdData.slug,
				});
				// on mobile show detailPaneElement first when a marker has been clicked
				if (window.matchMedia(mqLargeUntil).matches) {
					this.detailPaneElement.style.zIndex = '3';
				}
			});
		});

		mapToggleButtonElement.addEventListener('click', () => {
			if (this.mapShown) {
				this.mapShown = false;
				this.navigatorElement.classList.remove('show-map');
				mapToggleButtonListElement.hidden = true;
				mapToggleButtonMapElement.hidden = false;
				mapToggleButtonElement.focus();
			} else {
				this.mapShown = true;
				this.navigatorElement.classList.add('show-map');
				mapToggleButtonListElement.hidden = false;
				mapToggleButtonMapElement.hidden = true;
				this.mapElement.focus();
			}
		});

		mapCloseButton.addEventListener('click', () => {
			this.mapShown = false;
			this.navigatorElement.classList.remove('show-map');
			mapToggleButtonListElement.hidden = true;
			mapToggleButtonMapElement.hidden = false;
			mapToggleButtonElement.focus();
		});

		this.mapInitialised = true;
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

		const seriesFilter = filter
			.filter((item) => item.startsWith('series-'))
			.map((item) => item.replace('series-', ''));

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
		});

		this.listNoResultElement.hidden = !!this.locations.filter(
			(location) => !location.element.hidden,
		).length;

		// hide/show detail pane
		if (parsedQueryString.locatie) {
			this.activeLocationSlug = parsedQueryString.locatie as string;
			const newLocation = this.locations.filter(
				(location) => location.properties.slug === this.activeLocationSlug,
			)[0];
			if (newLocation) {
				const newDetailElement = generateDetail({
					location: newLocation,
					template: this.detailTemplateElement,
					locale: this.locale,
					accessToken: this.token,
				});

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

		// show the map overview after map preview is clicked by overriding z-indexes
		const mapOverviewButton = this.detailScrollerElement.querySelector(
			'[data-module-bind="navigator__map-preview"]',
		) as HTMLButtonElement;
		const navigatorWrapMap = this.navigatorElement.querySelector(
			'.c-navigator__wrap-map',
		) as HTMLDivElement;
		const mapOverviewCloseButton = this.navigatorElement.querySelector(
			'[data-module-bind="navigator__map-close"]',
		) as HTMLButtonElement;

		if (window.matchMedia(mqLargeUntil).matches) {
			if (mapOverviewButton) {
				mapOverviewButton.addEventListener('click', () => {
					navigatorWrapMap.style.zIndex = '3';
					this.detailPaneElement.style.zIndex = '2';
				});
			}

			// reset z-index style overrides when map overview close button has been clicked
			mapOverviewCloseButton.addEventListener('click', () => {
				navigatorWrapMap.removeAttribute('style');
				this.detailPaneElement.removeAttribute('style');
			});
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
		this.initDetailPane();
		this.initFilter();

		// Initialise onHistoryChange
		window.onpopstate = () => {
			this.onHistoryChange();
		};
		this.onHistoryChange();
	}
}
