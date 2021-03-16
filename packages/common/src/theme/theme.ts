import { Theme } from 'theme-ui';

export const theme: Theme = {
	useCustomProperties: false,
	colors: {
		text: '#000000',
		header: '#21426F',
		secondaryHeader: '#BC285C',
		hover: '#092a7e',
		detailText: '#6A6A6A',
		disabledCalendar: '#BFBFBF',
		stepElement: '#AEC1D1',
		background: '#FFFFFF',
		headerBackground: '#EFF7F9',

		hoverSecondary: '#931e55',
		structureBackground: '#f0d5e2',
		backgroundSecondary: '#f4b843',
		footerBackground: '#0e6999',
		roHighlight: '#21416F',
		internalLink: '#3D7AA3',
		inputBorder: '#CECECE',

		button: '#CD005A',
		buttonHover: '#A00057',

		link: '#01689B',
		linkHover: '#002783',

		sidePanel: '#F9C346',

		smallText: '#CA005D',
		copyHeading: '#154273',
		copyBody: 'black',
	},
	breakpoints: ['1024px', '1280px', '1440px'],
	sizes: {
		container: '100%',
		maxWidthBody: ['665px'],
		buttonHeight: '55px',
		widgetMaxWidth: '450px',
	},
	space: {
		mobilePadding: '17px',
		componentSpacing: ['1em', 0],
		paragraphMobile: '24px',
		paragraphDesktop: '28px',
		underBotton: '38px',
		section: '70px',
		buttonPadding: '36px',
		sidePanel: ['300px', '400px'],
		sidePanelLarge: '400px',
	},
	radii: {
		button: '5px',
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
		body: '20px',
		bodyMobile: '19px',
		smallText: '16px',
		footerText: '19px',
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
		},
		li: {
			listStyleImage: 'url("/icons/Polygon 6.svg")',
		},
		p: {
			fontSize: '14pt',
		},
		ul: {
			fontSize: '14pt',
		},
	},
};
