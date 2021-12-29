import { useEffect } from 'react';
import Router from 'next/router';

import { isBrowser } from '@quarantaine/common';

declare global {
	interface Window {
		Piwik?: {
			getTracker?: () => { trackPageView?: () => void };
		};
		_paq?: Array<any>;
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
const trackPageview = () => {
	if (!isBrowser()) return;

	try {
		window?.Piwik?.getTracker?.().trackPageView?.();
	} catch {}
};

/**
 * Small helper method to wrap the piwik trackGoal
 * inside a try catch and making sure it only runs on the browser.
 */ export const trackGoal = (goalID: number) => {
	if (!isBrowser()) return;

	try {
		window?._paq?.push(['trackGoal', goalID]);
	} catch {}
};

/**
 * Small helper method to wrap the piwik trackEvent
 * inside a try catch and making sure it only runs on the browser.
 */
export const trackEvent = (
	category: string,
	action: string,
	name?: string,
	value?: number,
) => {
	if (!isBrowser()) return;

	try {
		window?._paq?.push(['trackEvent', category, action, name, value]);
	} catch {}
};
