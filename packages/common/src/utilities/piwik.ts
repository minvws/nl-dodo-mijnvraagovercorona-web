import { useEffect } from 'react';
import Router from 'next/router';

import { isBrowser } from './is-browser';

declare global {
	interface Window {
		Piwik?: {
			getTracker?: () => { trackPageView?: () => void };
		};
	}
}

export const usePiwik = () => {
	useEffect(() => {
		Router.events.on('routeChangeComplete', trackPageview);
		return () => {
			Router.events.off('routeChangeComplete', trackPageview);
		};
	}, []);
};

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
