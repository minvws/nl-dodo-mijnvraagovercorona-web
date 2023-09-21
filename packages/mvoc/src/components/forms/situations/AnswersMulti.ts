import { differenceInCalendarDays } from 'date-fns';
import { calculateDay, getDaySlug } from 'src/utilities/helpers/advice-helpers';
import { getDatePickerValue } from 'src/utilities/state/datePicker';

export const moduleName = 'answers-multi';

export const initAnswersMulti = () => {
	const form = document.querySelector(
		`[data-module="${moduleName}"]`,
	) as HTMLFormElement;
	if (!form) return false;
	const submitButtons = form.querySelectorAll('button[type="submit"]');
	const controls = form.querySelectorAll<HTMLInputElement>(
		'[type="checkbox"], [type="radio"]',
	);

	if (!submitButtons && !controls) return false;
	const maxDays = parseInt(form.getAttribute('data-max-days'));

	// cache stuff in the case of a datepicker earlier on in the flow
	let day = 0;
	const diff = getDatePickerValue()
		? differenceInCalendarDays(new Date(getDatePickerValue()), new Date())
		: undefined;

	// Enable/disable submit buttons
	const toggleSubmitButtons = () => {
		const formData = new FormData(form);
		[...submitButtons].forEach(
			(button: HTMLButtonElement) =>
				(button.disabled = !formData.has(moduleName)),
		);
	};

	// Handle control select
	const handleChange = (event: Event) => {
		const input = event.target as HTMLElement;
		const maxDays = parseInt(input.getAttribute('data-max-days'));
		if (diff && maxDays) day = calculateDay(diff, maxDays);
		toggleSubmitButtons();
	};

	// bind change event to controls
	[...controls].forEach((control) =>
		control.addEventListener('change', handleChange),
	);

	// handle form submit event
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const selectedControls = [...controls]
			// filter out unchecked controls
			.filter((control) => control.checked)
			// sort controls by weight
			.sort((a, b) => {
				const aWeight = parseFloat(a.dataset.weight) || 0;
				const bWeight = parseFloat(b.dataset.weight) || 0;
				return aWeight < bWeight ? 1 : aWeight > bWeight ? -1 : 0;
			});

		// Does our control have a next data attribute?
		if (selectedControls.some((control) => control.dataset.next)) {
			const controlWithTheMostWeight = selectedControls.filter(
				(control) => control.dataset.next,
			)[0];
			const maxDays = parseInt(controlWithTheMostWeight.dataset.maxDays);
			if (diff && maxDays) day = calculateDay(diff, maxDays);
			const url = getDaySlug({
				slug: controlWithTheMostWeight.dataset.next,
				day: Math.abs(day),
			});
			(window as Window).location = url;
		} else {
			const button = event.submitter;
			const formData = new FormData(form);

			if (formData.get(moduleName) && button) {
				if (diff) day = calculateDay(diff, maxDays);
				const url = getDaySlug({
					slug: button.getAttribute('formaction'),
					day: Math.abs(day),
				});
				(window as Window).location = url;
			}
		}
	});

	// initial toggle for the submit buttons
	toggleSubmitButtons();
};
