module.exports = {
	stories: ['../src/**/*.stories.@(mdx)'],
	addons: [
		'@storybook/addon-knobs/register',
		'@storybook/addon-a11y/register',
		'@storybook/addon-viewport/register',
		'@storybook/addon-docs',
	],
};
