const debounce = (func, wait = 10, immediate = true) => {
	let timeout;
	return function () {
		const args = arguments;
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

export default debounce;
