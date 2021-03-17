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

export const usePiwik = ({ locale }) => {
	useEffect(() => {
		Router.events.on('routeChangeComplete', trackPageview);
		console.log('TRACK ON');
		return () => {
			console.log('TRACK OFF');
			Router.events.off('routeChangeComplete', trackPageview);
		};
	}, []);
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);
};

/**
 * Small helper method to wrap the piwik trackpageview
 * inside a try catch and making sure it only runs on the browser.
 */
export const trackPageview = () => {
	if (!isBrowser()) return;

	console.log('TRACK');

	try {
		window?.Piwik?.getTracker?.().trackPageView?.();
	} catch {}
};
