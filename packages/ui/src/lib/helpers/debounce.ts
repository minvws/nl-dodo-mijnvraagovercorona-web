export const debounce = (func: any, wait = 10, immediate = true) => {
	let timeout: any;
	return function () {
		const args = arguments;
		// @ts-ignore: An outer value of 'this' is shadowed by this container.
		let context = this;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const debounceQuick = (fn: any, wait = 10) => {
	let timeout: any = null;
	return (...args: any) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), wait);
	};
};
