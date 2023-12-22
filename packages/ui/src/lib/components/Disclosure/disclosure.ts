const getPanelDimensions = (panel: HTMLElement) => {
	const panelInner = panel.querySelector(
		'[data-module-bind="disclosure__panel-inner"]',
	) as HTMLDivElement;
	const rect = panelInner.getBoundingClientRect();
	return { blockSize: rect.height, inlineSize: rect.width };
};

/**
 * Check if an item is open
 */
const isOpen = (item: HTMLElement) => {
	return item.classList.contains('is-active');
};

/**
 * Open accordion item
 */
const openItem = (item: HTMLElement) => {
	const toggle = item.querySelector(
		'[data-module-bind="disclosure__toggle"]',
	) as HTMLButtonElement;
	const itemPanel = item.querySelector(
		'[data-module-bind="disclosure__panel"]',
	) as HTMLElement;

	item.classList.add('is-active');
	toggle.setAttribute('aria-expanded', new Boolean(true).toString());
	const dimensions = getPanelDimensions(itemPanel);
	itemPanel.style.blockSize = `${dimensions.blockSize}px`;
};

/**
 * Close accordion item
 */
const closeItem = (item: HTMLElement) => {
	const toggle = item.querySelector(
		'[data-module-bind="disclosure__toggle"]',
	) as HTMLElement;
	const itemPanel = item.querySelector(
		'[data-module-bind="disclosure__panel"]',
	) as HTMLElement;

	item.classList.remove('is-active');
	toggle.focus();
	toggle.setAttribute('aria-expanded', new Boolean(false).toString());
	// reset hard block size for the animation to be able to run
	// (we can't animate auto to 0)
	const dimensions = getPanelDimensions(itemPanel);
	itemPanel.style.blockSize = `${dimensions.blockSize}px`;
	// 1 frame later, set the bocksize to 0 to kick off the animation
	window.requestAnimationFrame(() => {
		itemPanel.style.blockSize = `0px`;
	});
};

/**
 * Toggle an item
 */
const toggleItem = (item: HTMLElement) => {
	isOpen(item) ? closeItem(item) : openItem(item);
};

/**
 * Escape key can close an item when its open and the focus is within the item
 */
document.addEventListener('keydown', (event) => {
	const item = (event.target as Element).closest(
		'[data-module-bind="disclosure__item"]',
	) as HTMLElement;

	if (event.key !== 'Escape' || !item) return;

	if (isOpen(item)) {
		closeItem(item);
	}
});

/**
 * When an item is targetted from a hash in the url, it will be
 * automatically expanded
 */
const openWithHash = () => {
	const hash = window.location.hash.substring(1);
	const element = document.getElementById(hash);
	if (element) {
		const item = element.closest('c-disclosure') as HTMLElement;
		if (item) {
			openItem(item);
		}
	}
};

if (window.location.hash) {
	openWithHash();
}

window.addEventListener('hashchange', () => {
	openWithHash();
});

class Disclosure extends HTMLElement {
	constructor() {
		super();

		const toggle = this.querySelector(
			'[data-module-bind="disclosure__toggle"]',
		) as HTMLButtonElement;

		const itemPanel = this.querySelector(
			'[data-module-bind="disclosure__panel"]',
		) as HTMLElement;

		toggle.addEventListener('click', () => {
			toggleItem(this);
		});

		/**
		 * When the animation is completed, set the height of an item to auto so
		 * it can scale again when resizing the browser
		 */
		itemPanel.addEventListener('transitionend', (event) => {
			if (event.target === itemPanel && isOpen(this)) {
				itemPanel.style.blockSize = `auto`;
			}
		});
	}
}

customElements.define('c-disclosure', Disclosure);
