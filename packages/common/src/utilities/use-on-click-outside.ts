import { useEffect } from 'react';

export const useOnClickOutside = (
	ref: React.RefObject<HTMLDivElement>,
	callback: () => void,
) => {
	useEffect(() => {
		const onClickOutside = (ev: MouseEvent) => {
			if (ref.current && !ref.current?.contains(ev.target as Node)) {
				callback();
			}
		};

		setTimeout(() => {
			document.addEventListener('mousedown', onClickOutside);
		}, 300);
		return () => document.removeEventListener('mousedown', onClickOutside);
	}, [callback, ref]);
};
