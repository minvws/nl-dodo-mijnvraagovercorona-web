import { differenceInCalendarDays } from 'date-fns';
import { calculateDay, getDaySlug } from 'src/utilities/helpers/advice-helpers';
import { getDatePickerValue } from 'src/utilities/state/datePicker';

export const moduleName = 'answers-single';

export const initAnswersSingle = () => {
	const form = document.querySelector(
		`[data-module="${moduleName}"]`,
	) as HTMLFormElement;
	if (!form) return false;
	const submitButtons = form.querySelectorAll('button[type="submit"]');
	const controls = form.querySelectorAll('[type="radio"]');

	if (!submitButtons && !controls) return false;

	let day = 0;
	const today = new Date();
	const diff = getDatePickerValue()
		? differenceInCalendarDays(new Date(getDatePickerValue()), today)
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
	const handleChange = (event) => {
		const input = event.target;
		const maxDays = parseInt(input.getAttribute('data-max-days'));
		if (diff) day = calculateDay(diff, maxDays);
		toggleSubmitButtons();
	};

	// handle form submit event
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const url = getDaySlug({
			slug: formData.get(moduleName).toString(),
			day: Math.abs(day),
		});
		(window as Window).location = url;
	});

	// bind change event to controls
	[...controls].forEach((checkbox) =>
		checkbox.addEventListener('change', handleChange),
	);

	// initial toggle for the submit buttons
	toggleSubmitButtons();
};
