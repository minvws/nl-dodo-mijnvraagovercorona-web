/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { Image, Container, ThemeUICSSObject, jsx } from 'theme-ui';

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

const RoHeaderLogo = (props: RoHeaderLogoProps) => {
	return (
		<Container className="logo" sx={{ textAlign: 'center' }}>
			<Link href="/" passHref>
				<a sx={{ img: { width: ['54px', '68px'], height: 'auto' } }}>
					<Image
						src="/icons/RO logo.svg"
						alt="Logo Rijksoverheid - Naar de homepage van Rieizentijdenscorona.nl"
					/>
					{props.children}
				</a>
			</Link>
		</Container>
	);
};

export default RoHeaderLogo;
