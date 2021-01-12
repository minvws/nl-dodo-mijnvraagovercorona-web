import { isBrowser } from './is-browser';

declare global {
	interface Window {
		Piwik?: {
			getTracker?: () => { trackPageView?: () => void };
		};
	}
}

/**
 * Small helper method to wrap the piwik trackpageview
 * inside a try catch and making sure it only runs on the browser.
 */
export const trackPageview = () => {
	if (!isBrowser()) return;

	try {
		window?.Piwik?.getTracker?.().trackPageView?.();
	} catch {}
};
