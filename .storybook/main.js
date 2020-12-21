const webpack = require('webpack');

module.exports = {
	stories: ['../src/**/*.stories.tsx'],
	addons: [
		'@storybook/addon-knobs/register',
		'@storybook/addon-a11y/register',
		'@storybook/addon-viewport/register',
	],
	webpackFinal: async (baseConfig) => {
		// const nextConfig = require('../next.config');

		baseConfig.module.rules.push({
			test: /\.(ts|tsx)$/,
			loader: require.resolve('babel-loader'),
			options: {
				presets: [['react-app', { flow: false, typescript: true }]],
			},
		});
		baseConfig.resolve.extensions.push('.ts', '.tsx');

		return {
			...baseConfig,
			// ...nextConfig.webpack
		};
	},
};
