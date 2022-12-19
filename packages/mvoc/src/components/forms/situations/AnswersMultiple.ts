export const moduleName = 'answers-multiple';

export const initAnswersMultiple = () => {
	const form = document.querySelector(
		`[data-module="${moduleName}"]`,
	) as HTMLFormElement;
	if (!form) return false;
	const submitButtons = form.querySelectorAll('button[type="submit"]');
	const checkboxes = form.querySelectorAll('[type="checkbox"]');

	if (!submitButtons && !checkboxes) return false;

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
		const formData = new FormData(form);
		if (!formData.get(moduleName)) {
			event.preventDefault();
		}
	});

	// bind change event to checkboxes
	[...checkboxes].forEach((checkbox) =>
		checkbox.addEventListener('change', handleChange),
	);

	// initial toggle for the submit buttons
	toggleSubmitButtons();
};
