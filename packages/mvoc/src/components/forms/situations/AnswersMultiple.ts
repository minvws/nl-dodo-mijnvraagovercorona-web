import { differenceInCalendarDays } from 'date-fns';
import { calculateDay, getDaySlug } from 'src/utilities/helpers/advice-helpers';
import { getDatePickerValue } from 'src/utilities/state/datePicker';

export const moduleName = 'answers-multiple';

export const initAnswersMultiple = () => {
	const form = document.querySelector(
		`[data-module="${moduleName}"]`,
	) as HTMLFormElement;
	if (!form) return false;
	const submitButtons = form.querySelectorAll('button[type="submit"]');
	const checkboxes = form.querySelectorAll('[type="checkbox"]');

	if (!submitButtons && !checkboxes) return false;

	const maxDays = parseInt(form.getAttribute('data-max-days'));
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

	// Handle checkbox select
	const handleChange = () => {
		toggleSubmitButtons();
	};

	// handle form submit event
	form.addEventListener('submit', (event) => {
		event.preventDefault();
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
	});

	// bind change event to checkboxes
	[...checkboxes].forEach((checkbox) =>
		checkbox.addEventListener('change', handleChange),
	);

	// initial toggle for the submit buttons
	toggleSubmitButtons();
};
