import { Theme } from 'theme-ui';

export const theme: Theme = {
	useCustomProperties: false,
	colors: {
		primary: '#01689B',
		secondary: '#CA005D',
		highlight: '#4A2CB1',
		white: '#ffffff',

		text: '#000000',
		header: '#21426F',
		secondaryHeader: '#BC285C',
		headerTertiary: '#01689B',
		hover: '#092a7e',
		detailText: '#6A6A6A',
		disabledCalendar: '#BFBFBF',
		stepElement: '#AEC1D1',
		background: '#FFFFFF',
		headerBackground: '#EFF7F9',
		headerBackgroundHighlight: '#DDEFF8',
		expansionPanel: '#EFF7F9',

		hoverSecondary: '#931e55',
		structureBackground: '#f0d5e2',
		backgroundSecondary: '#FFB612',
		footerBackground: '#0e6999',
		roHighlight: '#21416F',
		internalLink: '#3D7AA3',
		inputBorder: '#CECECE',

		button: '#CD005A',
		buttonHover: '#A00057',
		buttonSecondary: '#eef7fb',
		buttonSecondaryHover: '#fcfeff',
		buttonTertiary: '#0e6999',
		buttonTertiaryHover: '#094666',
		buttonDisabled: '#ccc',

		link: '#01689B',
		linkHover: '#002783',

		smallText: '#CA005D',
		copyHeading: '#154273',
		copyBody: 'black',
	},
	breakpoints: ['1024px', '1280px', '1440px'],
	sizes: {
		container: '1200px',
		maxWidthBody: ['665px'],
		buttonHeight: '55px',
		buttonSecondaryHeight: '45px',
		widgetMaxWidth: '450px',
	},
	space: {
		mobilePadding: '16px',
		tabletPadding: '24px',
		box: '16px',
		componentSpacing: ['1em', 0],
		paragraphSpacing: ['24px', '28px'],
		h2Spacing: '18px',
		section: '70px',
		buttonPadding: '36px',
	},
	radii: {
		button: '5px',
		box: '8px',
		tile: 'radii.box',
	},
	borders: {
		tile: '1px solid #EFF7F9',
	},
	shadows: {
		tile: '4px 12px 12px rgba(0, 0, 0, 0.07), 0px 4px 0px #EFF7F9',
		focusRing: '0px 0px 1px 3px rgba(1, 104, 155, 0.3)',
	},
	fonts: {
		body: 'RoSans, sans-serif',
		heading: 'RoSans, sans-serif',
	},
	fontSizes: {
		button: '20px',
		buttonMobile: '19px',
		link: '20px',
		linkMobile: '19px',
		h1: '40px',
		h1Mobile: '36px',
		chapeau: '16px',
		h2: '29px',
		h2Mobile: '26px',
		h3: '1.25rem',
		h3Mobile: '1rem',
		body: '20px',
		bodyMobile: '19px',
		smallText: '16px',
		footerText: '19px',
		asideText: '19px',
	},
	fontWeights: {
		light: 400,
	},
	lineHeights: {
		button: '28px',
		buttonMobile: '24px',
		link: '28px',
		linkMobile: '24px',
		h1: '44px',
		h1Mobile: '40px',
		chapeau: '20px',
		h2: '34px',
		h2Mobile: '30px',
		body: '28px',
		bodyMobile: '24px',
		smallText: '24px',
		smallTextMobile: '20px',
		detail: '20px',
	},
	styles: {
		root: {
			fontFamily: 'body',
			scrollBehavior: 'smooth',
			a: {
				color: 'copyHeading',
			},
			button: {
				cursor: 'pointer',
			},
		},
		h1: {
			fontFamily: 'heading',
			fontSize: ['h1Mobile', 'h1'],
			lineHeight: ['h1Mobile', 'h1'],
		},
		h2: {
			fontFamily: 'body',
			fontSize: ['h2Mobile', 'h2'],
			lineHeight: ['h2Mobile', 'h2'],
			color: 'header',
			margin: '0',
			marginBottom: 'h2Spacing',
		},
		h3: {
			color: 'header',
			fontSize: ['h3Mobile', 'h3'],
		},
		p: {
			fontSize: ['bodyMobile', 'body'],
			lineHeight: ['bodyMobile', 'body'],
			margin: '0',
			marginBottom: 'paragraphSpacing',
		},
		ul: {
			fontSize: ['bodyMobile', 'body'],
			lineHeight: ['bodyMobile', 'body'],
			margin: '0',
			marginBottom: 'paragraphSpacing',
		},
	},
	text: {
		chapeau: {
			fontFamily: 'body',
			fontSize: 'chapeau',
			lineHeight: 'chapeau',
			color: 'smallText',
			fontWeight: 'bold',
			marginTop: '16px',
			marginBottom: '12px',
		},
		small: {
			fontFamily: 'body',
			fontSize: 'chapeau',
			lineHeight: 'chapeau',
			marginTop: '16px',
			marginBottom: '12px',
		},
		legend: {
			fontFamily: 'body',
			fontSize: 'body',
			lineHeight: 'body',
			fontWeight: 'bold',
			marginBottom: '12px',
			padding: 0,
		},
	},
};
