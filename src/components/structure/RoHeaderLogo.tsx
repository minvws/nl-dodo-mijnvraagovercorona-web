/** @jsx jsx */
import React from 'react';
import { Link } from 'components/link';

import { Image, Container, ThemeUICSSObject, jsx } from 'theme-ui';
import { useSanitySiteSettings } from 'hooks/translation';

type RoHeaderLogoProps = {
	children?: React.ReactNode;
};

export const alignLogoRightOnMobileStyles: ThemeUICSSObject = {
	'.logo': {
		textAlign: ['right', 'center'],
		paddingRight: ['34px', 0],
	},
	header: {
		backgroundImage: 'none',
	},
	'.language-selector': {
		display: ['none', 'flex'],
	},
};

export const RoHeaderLogo = (props: RoHeaderLogoProps) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<Container className="logo" sx={{ textAlign: 'center' }}>
			<Link href="/" passHref>
				<a sx={{ img: { width: ['54px', '68px'], height: 'auto' } }}>
					<Image src="/icons/RO logo.svg" alt={siteSettings.header.logoAlt} />
					{props.children}
				</a>
			</Link>
		</Container>
	);
};
