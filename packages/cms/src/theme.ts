import { buildLegacyTheme } from 'sanity';
import { studioDataSet } from './environment';

const navbarColors =
	studioDataSet === 'development'
		? {
				'--mvoc-navbar-background-color': '#ff4013', // red
				'--mvoc-navbar-color': '#1a1a1a',
		  }
		: studioDataSet === 'staging'
		? {
				'--mvoc-navbar-background-color': '#fffc41', // yellow
				'--mvoc-navbar-color': '#1a1a1a',
		  }
		: studioDataSet === 'main'
		? {
				'--mvoc-navbar-background-color': '#96d35f', // Green
				'--mvoc-navbar-color': '#1a1a1a',
		  }
		: studioDataSet === 'alternative'
		? {
				'--mvoc-navbar-background-color': '#00c7fc', // Blue
				'--mvoc-navbar-color': '#1a1a1a',
		  }
		: {
				'--mvoc-navbar-background-color': '#1a1a1a',
				'--mvoc-navbar-color': '#fff',
		  };

const props = {
	...navbarColors,
};

export const theme = buildLegacyTheme({
	/* Navbar */
	'--main-navigation-color': props['--mvoc-navbar-background-color'],
	'--main-navigation-color--inverted': props['--mvoc-navbar-color'],
});
