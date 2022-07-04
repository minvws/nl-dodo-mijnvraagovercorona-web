import { useEffect } from 'react';
import { useRouter } from 'next/router';

const getTargetLocale = () => {
	const locale = window.location.pathname.split('/')[1];

	return locale === 'en' || locale === 'en' ? locale : 'nl';
};

const Custom404 = () => {
	const router = useRouter();

	useEffect(() => {
		const locale = getTargetLocale();

		router.replace(`${locale}`);
	});

	return null;
};

export default Custom404;
