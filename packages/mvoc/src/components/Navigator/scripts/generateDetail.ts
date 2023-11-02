import { mqLarge } from '@design-system/primitives/responsive';
import copy from 'copy-to-clipboard';
import type { FeatureProps } from 'src/utilities/helpers/features';
import { replaceAll, replaceTimeTable } from './replacement-helpers';
import { isOpenNow } from './timetable-helpers';

export const generateDetail = ({
	location,
	template,
	locale,
	accessToken,
}: {
	location: FeatureProps;
	template: HTMLTemplateElement;
	locale: string;
	accessToken: string;
}): HTMLDivElement => {
	const clone = template.content.firstElementChild.cloneNode(
		true,
	) as HTMLDivElement;

	// Replace variables
	replaceAll({ location, container: clone, locale });
	replaceTimeTable({
		location,
		container: clone,
		locale,
	});

	// Add/remove/replace static map on larger viewports
	const imageWrapElements =
		clone.querySelectorAll<HTMLDivElement>('[data-wrap-image]');

	if (window.matchMedia(mqLarge).matches) {
		imageWrapElements.forEach((element) => element.remove());
	} else {
		const mapImageElements =
			clone.querySelectorAll<HTMLImageElement>('[data-image-map]');
		mapImageElements.forEach((element) => {
			element.src = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${location.geometry.coordinates[0]},${location.geometry.coordinates[1]},17,0.00,0.00/768x460@2x?access_token=${accessToken}`;
		});

		const mapMarkerIconElements =
			clone.querySelectorAll<HTMLImageElement>('[data-marker-icon]');
		if (isOpenNow(location.properties.openingHours)) {
			mapMarkerIconElements.forEach((element) => {
				element.src = element.dataset.srcOpen;
			});
		}
	}

	// initialise copybutton
	const copyButtonElement = clone.querySelector(
		'[data-module-bind="location__button-copy"]',
	) as HTMLButtonElement;

	if (copyButtonElement) {
		const copyButtonContentElement = copyButtonElement.querySelector(
			'[data-button-content]',
		);
		const address = `${location.properties.location.address}, ${location.properties.location.city}`;

		copyButtonElement.addEventListener('click', (event) => {
			event.preventDefault();
			if (copy(address)) {
				copyButtonContentElement.innerHTML = copyButtonElement.dataset
					.labelCopied as string;

				// re-instate original label after a couple of seconds
				setTimeout(() => {
					if (copyButtonContentElement)
						copyButtonContentElement.innerHTML = copyButtonElement.dataset
							.labelCopy as string;
				}, 1500);
			}
		});
	}

	return clone;
};
