/**
 * Get all focusable elements within a given element
 * @param element HTMLElement
 * @returns NodeList
 */
export const getKeyboardFocusableElements = (element) => {
	return [
		...element.querySelectorAll(
			'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
		),
	].filter((el) => !el.hasAttribute('disabled'));
};

/**
 * 	Trap the focus within the modal when opened
 * @param element
 * @param event
 */
export const trapFocus = (element, event: KeyboardEvent) => {
	const focusables = getKeyboardFocusableElements(element);
	const firstFocusable = focusables[0];
	const lastFocusable = focusables[focusables.length - 1];
	if (
		document.activeElement === lastFocusable &&
		event.key === 'Tab' &&
		!event.shiftKey
	) {
		event.preventDefault();
		firstFocusable.focus();
	}
	if (
		document.activeElement === firstFocusable &&
		event.key === 'Tab' &&
		event.shiftKey
	) {
		event.preventDefault();
		lastFocusable.focus();
	}
};
