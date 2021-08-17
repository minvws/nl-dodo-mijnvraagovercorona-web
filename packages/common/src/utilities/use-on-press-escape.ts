import { useEffect } from 'react';

export const useOnPressEscape = (callback: () => void) => {
	useEffect(() => {
		const onEscPress = (ev: KeyboardEvent) => {
			if (ev.key === 'Escape') {
				callback();
			}
		};

		document.documentElement.addEventListener('keydown', onEscPress);
		return () =>
			document.documentElement.removeEventListener('keydown', onEscPress);
	}, [callback]);
};
