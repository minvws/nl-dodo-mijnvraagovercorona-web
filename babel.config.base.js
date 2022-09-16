module.exports = {
	presets: [
		[
			'next/babel',
			{
				'preset-react': {
					runtime: 'automatic',
					importSource: 'theme-ui',
					throwIfNamespace: false,
				},
			},
		],
		'@babel/preset-typescript',
	],
	env: {
		production: {
			plugins: ['emotion'],
		},
		development: {
			plugins: [['emotion', { sourceMap: true }]],
		},
	},
};
