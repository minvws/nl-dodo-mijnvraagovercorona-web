import { getHrefWithlocale, useCurrentLocale } from '@quarantaine/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const hashRedirects: { [key: string]: string } = {
	'#ik-heb-een-positieve-zelftestuitslag': '/mijn-test-is-positief',
	'#ik-heb-zelf-corona': '/mijn-test-is-positief',
	'#iemand-bij-mij-in-huis-heeft-corona':
		'/advies/iemand-bij-mij-thuis-heeft-corona',
	'#ik-ben-in-de-buurt-geweest-van-iemand-met-corona':
		'/situatie/in-de-buurt-heb-je-klachten-die-bij-corona-passen',
	'#ik-heb-een-negatieve-testuitslag':
		'/situatie/negatieve-test-heb-je-klachten-die-bij-corona-passen',
};

export const useHashRedirectService = () => {
	const router = useRouter();
	const locale = useCurrentLocale();

	useEffect(() => {
		const { hash } = window.location;

		if (hash && hashRedirects[hash]) {
			router.push(getHrefWithlocale(hashRedirects[hash], locale.urlPrefix));
		}
	}, []);
};
