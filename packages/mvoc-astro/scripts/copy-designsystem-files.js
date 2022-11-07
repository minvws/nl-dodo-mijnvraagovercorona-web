const { copy } = require('fs-extra');

(async () => {
	try {
		copy('../design-system/public/fonts', './public/fonts/', {
			overwrite: true,
		});
		copy('../design-system/src/icons/', './src/icons/', {
			overwrite: true,
		});
	} catch (error) {
		console.log(error);
	}
})();
