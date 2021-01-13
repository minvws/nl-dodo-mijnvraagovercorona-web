module.exports = {
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
	],
	setupFilesAfterEnv: ['<rootDir>/jest-helpers/setup-tests.js'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.storybook/'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src', '<rootDir>'],
};
