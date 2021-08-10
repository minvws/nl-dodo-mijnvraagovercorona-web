import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useOnRouteChange = (callback: () => void) => {
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', callback);
		return () => router.events.off('routeChangeStart', callback);
	}, [router]);
};
