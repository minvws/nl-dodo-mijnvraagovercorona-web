declare global {
	interface Window {
		Piwik?: {
			getTracker?: () => { trackPageView?: () => void };
		};
		_paq?: Array<any>;
	}
}

export const trackEvent = (
	category: string,
	action: string,
	name?: string,
	value?: number,
) => {
	try {
		window?._paq?.push(['trackEvent', category, action, name, value]);
	} catch {}
};
