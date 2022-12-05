import { useEffect } from 'react';
import Router from 'next/router';

import { isBrowser } from '@quarantaine/common';

declare global {
	interface Window {
		_mfq?: Array<any>;
	}
}

export const useMouseFlow = () => {
	useEffect(() => {
		Router.events.on('routeChangeComplete', trackPageView);
		return () => {
			Router.events.off('routeChangeComplete', trackPageView);
		};
	}, []);
};

const trackPageView = (url) => {
	if (!isBrowser()) return;

	try {
		window._mfq.push(['newPageView', url]);
	} catch {}
};
