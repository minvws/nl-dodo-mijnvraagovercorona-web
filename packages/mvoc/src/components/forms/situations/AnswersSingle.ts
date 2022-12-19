export const moduleName = 'answers-single';

export const initAnswersSingle = () => {
	const form = document.querySelector(
		`[data-module="${moduleName}"]`,
	) as HTMLFormElement;
	if (!form) return false;
	const submitButtons = form.querySelectorAll('button[type="submit"]');
	const controls = form.querySelectorAll('[type="radio"]');

	if (!submitButtons && !controls) return false;

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
		const formData = new FormData(form);
		(window as Window).location = formData.get(moduleName).toString();
	});

	// bind change event to controls
	[...controls].forEach((checkbox) =>
		checkbox.addEventListener('change', handleChange),
	);

	// initial toggle for the submit buttons
	toggleSubmitButtons();
};
